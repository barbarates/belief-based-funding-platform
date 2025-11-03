import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Peoplefi } from "../target/types/peoplefi";
import { assert } from "chai";

describe("peoplefi", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Peoplefi as Program<Peoplefi>;
  
  const creator = provider.wallet;
  let campaignPda: anchor.web3.PublicKey;
  let vaultPda: anchor.web3.PublicKey;
  let investmentPda: anchor.web3.PublicKey;

  const campaignTitle = "Test Campaign";
  const campaignDescription = "This is a test campaign for PeopleFi";
  const goalAmount = new anchor.BN(10 * anchor.web3.LAMPORTS_PER_SOL);
  const deadline = Math.floor(Date.now() / 1000) + 86400 * 30; // 30 days from now

  it("Creates a campaign", async () => {
    [campaignPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("campaign"),
        creator.publicKey.toBuffer(),
        Buffer.from(campaignTitle),
      ],
      program.programId
    );

    [vaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), campaignPda.toBuffer()],
      program.programId
    );

    const milestones = [
      {
        title: "Milestone 1",
        description: "First milestone",
        amount: new anchor.BN(3 * anchor.web3.LAMPORTS_PER_SOL),
        status: { pending: {} },
        votesFor: new anchor.BN(0),
        votesAgainst: new anchor.BN(0),
        voters: [],
      },
      {
        title: "Milestone 2",
        description: "Second milestone",
        amount: new anchor.BN(7 * anchor.web3.LAMPORTS_PER_SOL),
        status: { pending: {} },
        votesFor: new anchor.BN(0),
        votesAgainst: new anchor.BN(0),
        voters: [],
      },
    ];

    await program.methods
      .createCampaign(
        campaignTitle,
        campaignDescription,
        goalAmount,
        new anchor.BN(deadline),
        milestones
      )
      .accounts({
        campaign: campaignPda,
        campaignVault: vaultPda,
        creator: creator.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const campaignAccount = await program.account.campaign.fetch(campaignPda);
    
    assert.equal(campaignAccount.title, campaignTitle);
    assert.equal(campaignAccount.description, campaignDescription);
    assert.equal(campaignAccount.creator.toString(), creator.publicKey.toString());
    assert.equal(campaignAccount.goalAmount.toString(), goalAmount.toString());
    assert.equal(campaignAccount.raisedAmount.toString(), "0");
    assert.equal(campaignAccount.milestones.length, 2);
  });

  it("Invests in a campaign", async () => {
    const investor = anchor.web3.Keypair.generate();
    
    // Airdrop para o investidor
    const signature = await provider.connection.requestAirdrop(
      investor.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(signature);

    [investmentPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("investment"),
        campaignPda.toBuffer(),
        investor.publicKey.toBuffer(),
      ],
      program.programId
    );

    const investAmount = new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL);

    await program.methods
      .invest(investAmount)
      .accounts({
        campaign: campaignPda,
        campaignVault: vaultPda,
        investment: investmentPda,
        investor: investor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([investor])
      .rpc();

    const campaignAccount = await program.account.campaign.fetch(campaignPda);
    const investmentAccount = await program.account.investment.fetch(investmentPda);
    
    assert.equal(campaignAccount.raisedAmount.toString(), investAmount.toString());
    assert.equal(campaignAccount.investorCount, 1);
    assert.equal(investmentAccount.amount.toString(), investAmount.toString());
    assert.equal(investmentAccount.investor.toString(), investor.publicKey.toString());
  });

  it("Votes on a milestone", async () => {
    const investor = anchor.web3.Keypair.generate();
    
    // Airdrop e investir
    const signature = await provider.connection.requestAirdrop(
      investor.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(signature);

    const [newInvestmentPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("investment"),
        campaignPda.toBuffer(),
        investor.publicKey.toBuffer(),
      ],
      program.programId
    );

    const investAmount = new anchor.BN(6 * anchor.web3.LAMPORTS_PER_SOL);

    await program.methods
      .invest(investAmount)
      .accounts({
        campaign: campaignPda,
        campaignVault: vaultPda,
        investment: newInvestmentPda,
        investor: investor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([investor])
      .rpc();

    // Votar no milestone
    await program.methods
      .voteMilestone(0, true)
      .accounts({
        campaign: campaignPda,
        investment: newInvestmentPda,
        voter: investor.publicKey,
      })
      .signers([investor])
      .rpc();

    const campaignAccount = await program.account.campaign.fetch(campaignPda);
    const milestone = campaignAccount.milestones[0];
    
    assert.equal(milestone.votesFor.toString(), investAmount.toString());
    assert.equal(milestone.voters.length, 1);
  });
});
