use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod peoplefi {
    use super::*;

    pub fn create_campaign(
        ctx: Context<CreateCampaign>,
        title: String,
        description: String,
        goal_amount: u64,
        deadline: i64,
        milestones: Vec<MilestoneData>,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let clock = Clock::get()?;

        require!(title.len() <= 100, ErrorCode::TitleTooLong);
        require!(description.len() <= 500, ErrorCode::DescriptionTooLong);
        require!(goal_amount > 0, ErrorCode::InvalidAmount);
        require!(deadline > clock.unix_timestamp, ErrorCode::InvalidDeadline);
        require!(milestones.len() <= 10, ErrorCode::TooManyMilestones);

        campaign.creator = ctx.accounts.creator.key();
        campaign.title = title;
        campaign.description = description;
        campaign.goal_amount = goal_amount;
        campaign.raised_amount = 0;
        campaign.deadline = deadline;
        campaign.status = CampaignStatus::Active;
        campaign.created_at = clock.unix_timestamp;
        campaign.investor_count = 0;
        campaign.milestones = milestones;
        campaign.bump = ctx.bumps.campaign;

        Ok(())
    }

    pub fn invest(
        ctx: Context<Invest>,
        amount: u64,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let investment = &mut ctx.accounts.investment;
        let clock = Clock::get()?;

        require!(amount > 0, ErrorCode::InvalidAmount);
        require!(
            campaign.status == CampaignStatus::Active,
            ErrorCode::CampaignNotActive
        );
        require!(
            clock.unix_timestamp < campaign.deadline,
            ErrorCode::CampaignExpired
        );

        // Transfer SOL from investor to campaign vault
        let transfer_instruction = system_instruction::transfer(
            &ctx.accounts.investor.key(),
            &ctx.accounts.campaign_vault.key(),
            amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                ctx.accounts.investor.to_account_info(),
                ctx.accounts.campaign_vault.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Update campaign
        campaign.raised_amount += amount;
        campaign.investor_count += 1;

        // Create investment record
        investment.investor = ctx.accounts.investor.key();
        investment.campaign = ctx.accounts.campaign.key();
        investment.amount = amount;
        investment.invested_at = clock.unix_timestamp;
        investment.bump = ctx.bumps.investment;

        Ok(())
    }

    pub fn vote_milestone(
        ctx: Context<VoteMilestone>,
        milestone_index: u8,
        approve: bool,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let investment = &ctx.accounts.investment;

        require!(
            (milestone_index as usize) < campaign.milestones.len(),
            ErrorCode::InvalidMilestone
        );

        let milestone = &mut campaign.milestones[milestone_index as usize];
        
        require!(
            milestone.status == MilestoneStatus::Pending,
            ErrorCode::MilestoneNotPending
        );

        // Check if investor already voted
        require!(
            !milestone.voters.contains(&ctx.accounts.voter.key()),
            ErrorCode::AlreadyVoted
        );

        // Add vote weighted by investment amount
        if approve {
            milestone.votes_for += investment.amount;
        } else {
            milestone.votes_against += investment.amount;
        }

        milestone.voters.push(ctx.accounts.voter.key());

        // Check if milestone can be approved (>50% of raised amount voted yes)
        if milestone.votes_for > (campaign.raised_amount / 2) {
            milestone.status = MilestoneStatus::Approved;
        }

        Ok(())
    }

    pub fn release_milestone_funds(
        ctx: Context<ReleaseFunds>,
        milestone_index: u8,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;

        require!(
            (milestone_index as usize) < campaign.milestones.len(),
            ErrorCode::InvalidMilestone
        );

        let milestone = &campaign.milestones[milestone_index as usize];
        
        require!(
            milestone.status == MilestoneStatus::Approved,
            ErrorCode::MilestoneNotApproved
        );

        let amount_to_release = milestone.amount;

        // Transfer from vault to creator
        let campaign_key = campaign.key();
        let seeds = &[
            b"campaign",
            campaign.creator.as_ref(),
            campaign_key.as_ref(),
            &[campaign.bump],
        ];
        let signer = &[&seeds[..]];

        let transfer_instruction = system_instruction::transfer(
            &ctx.accounts.campaign_vault.key(),
            &ctx.accounts.creator.key(),
            amount_to_release,
        );

        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                ctx.accounts.campaign_vault.to_account_info(),
                ctx.accounts.creator.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            signer,
        )?;

        // Update milestone status
        let milestone = &mut campaign.milestones[milestone_index as usize];
        milestone.status = MilestoneStatus::Released;

        Ok(())
    }

    pub fn cancel_campaign(ctx: Context<CancelCampaign>) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        
        require!(
            campaign.creator == ctx.accounts.creator.key(),
            ErrorCode::Unauthorized
        );
        require!(
            campaign.status == CampaignStatus::Active,
            ErrorCode::CampaignNotActive
        );

        campaign.status = CampaignStatus::Cancelled;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateCampaign<'info> {
    #[account(
        init,
        payer = creator,
        space = Campaign::LEN,
        seeds = [b"campaign", creator.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub campaign: Account<'info, Campaign>,
    
    /// CHECK: This is the PDA vault for the campaign
    #[account(
        seeds = [b"vault", campaign.key().as_ref()],
        bump
    )]
    pub campaign_vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    
    /// CHECK: This is the PDA vault for the campaign
    #[account(
        mut,
        seeds = [b"vault", campaign.key().as_ref()],
        bump
    )]
    pub campaign_vault: AccountInfo<'info>,
    
    #[account(
        init,
        payer = investor,
        space = Investment::LEN,
        seeds = [b"investment", campaign.key().as_ref(), investor.key().as_ref()],
        bump
    )]
    pub investment: Account<'info, Investment>,
    
    #[account(mut)]
    pub investor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VoteMilestone<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    
    #[account(
        seeds = [b"investment", campaign.key().as_ref(), voter.key().as_ref()],
        bump = investment.bump
    )]
    pub investment: Account<'info, Investment>,
    
    pub voter: Signer<'info>,
}

#[derive(Accounts)]
pub struct ReleaseFunds<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    
    /// CHECK: This is the PDA vault for the campaign
    #[account(
        mut,
        seeds = [b"vault", campaign.key().as_ref()],
        bump
    )]
    pub campaign_vault: AccountInfo<'info>,
    
    /// CHECK: Campaign creator
    #[account(mut)]
    pub creator: AccountInfo<'info>,
    
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelCampaign<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    pub creator: Signer<'info>,
}

#[account]
pub struct Campaign {
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub goal_amount: u64,
    pub raised_amount: u64,
    pub deadline: i64,
    pub status: CampaignStatus,
    pub created_at: i64,
    pub investor_count: u32,
    pub milestones: Vec<MilestoneData>,
    pub bump: u8,
}

impl Campaign {
    pub const LEN: usize = 8 + // discriminator
        32 + // creator
        4 + 100 + // title (String with max 100 chars)
        4 + 500 + // description (String with max 500 chars)
        8 + // goal_amount
        8 + // raised_amount
        8 + // deadline
        1 + // status
        8 + // created_at
        4 + // investor_count
        4 + (10 * MilestoneData::LEN) + // milestones vec (max 10)
        1; // bump
}

#[account]
pub struct Investment {
    pub investor: Pubkey,
    pub campaign: Pubkey,
    pub amount: u64,
    pub invested_at: i64,
    pub bump: u8,
}

impl Investment {
    pub const LEN: usize = 8 + // discriminator
        32 + // investor
        32 + // campaign
        8 + // amount
        8 + // invested_at
        1; // bump
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum CampaignStatus {
    Active,
    Completed,
    Cancelled,
    Failed,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct MilestoneData {
    pub title: String,
    pub description: String,
    pub amount: u64,
    pub status: MilestoneStatus,
    pub votes_for: u64,
    pub votes_against: u64,
    pub voters: Vec<Pubkey>,
}

impl MilestoneData {
    pub const LEN: usize = 4 + 50 + // title
        4 + 200 + // description
        8 + // amount
        1 + // status
        8 + // votes_for
        8 + // votes_against
        4 + (10 * 32); // voters (max 10)
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum MilestoneStatus {
    Pending,
    Approved,
    Released,
    Rejected,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Title is too long (max 100 characters)")]
    TitleTooLong,
    #[msg("Description is too long (max 500 characters)")]
    DescriptionTooLong,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Invalid deadline")]
    InvalidDeadline,
    #[msg("Too many milestones (max 10)")]
    TooManyMilestones,
    #[msg("Campaign is not active")]
    CampaignNotActive,
    #[msg("Campaign has expired")]
    CampaignExpired,
    #[msg("Invalid milestone index")]
    InvalidMilestone,
    #[msg("Milestone is not pending")]
    MilestoneNotPending,
    #[msg("Already voted on this milestone")]
    AlreadyVoted,
    #[msg("Milestone is not approved")]
    MilestoneNotApproved,
    #[msg("Unauthorized")]
    Unauthorized,
}
