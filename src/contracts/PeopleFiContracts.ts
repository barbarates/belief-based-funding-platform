
// Smart Contract interfaces and types for PeopleFi platform

export interface Campaign {
  id: string;
  creator: string;
  title: string;
  description: string;
  goalAmount: bigint;
  raisedAmount: bigint;
  deadline: number;
  milestones: Milestone[];
  isActive: boolean;
  isCompleted: boolean;
  createdAt: number;
}

export interface Milestone {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  fundingPercentage: number; // Percentage of total funding released when completed
  isCompleted: boolean;
  completedAt?: number;
  votesFor: number;
  votesAgainst: number;
  votingDeadline: number;
}

export interface Investment {
  id: string;
  investor: string;
  campaignId: string;
  amount: bigint;
  investedAt: number;
  expectedReturn: number;
  returnReceived: bigint;
  isActive: boolean;
}

export interface Creator {
  address: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  totalRaised: bigint;
  successfulCampaigns: number;
  isVerified: boolean;
  reputation: number;
}

// Smart Contract function signatures (to be implemented)
export interface PeopleFiContract {
  // Campaign Management
  createCampaign(
    title: string,
    description: string,
    goalAmount: bigint,
    deadline: number,
    milestones: Omit<Milestone, 'id' | 'campaignId' | 'isCompleted' | 'votesFor' | 'votesAgainst'>[]
  ): Promise<string>; // Returns campaign ID

  investInCampaign(campaignId: string, amount: bigint): Promise<string>; // Returns investment ID

  // Milestone Management
  submitMilestoneCompletion(campaignId: string, milestoneId: string, proof: string): Promise<void>;
  
  voteOnMilestone(
    campaignId: string, 
    milestoneId: string, 
    vote: boolean, 
    reason?: string
  ): Promise<void>;

  releaseMilestoneFunds(campaignId: string, milestoneId: string): Promise<void>;

  // Revenue Sharing
  distributeReturns(campaignId: string, totalReturn: bigint): Promise<void>;

  // Getters
  getCampaign(campaignId: string): Promise<Campaign>;
  getInvestorInvestments(investor: string): Promise<Investment[]>;
  getCreatorCampaigns(creator: string): Promise<Campaign[]>;
  getAllActiveCampaigns(): Promise<Campaign[]>;

  // Platform Statistics
  getPlatformStats(): Promise<{
    totalInvested: bigint;
    activeInvestors: number;
    successRate: number;
    avgReturn: number;
  }>;
}

// Events emitted by the smart contract
export interface ContractEvents {
  CampaignCreated: {
    campaignId: string;
    creator: string;
    goalAmount: bigint;
  };

  InvestmentMade: {
    campaignId: string;
    investor: string;
    amount: bigint;
  };

  MilestoneCompleted: {
    campaignId: string;
    milestoneId: string;
    fundsReleased: bigint;
  };

  ReturnsDistributed: {
    campaignId: string;
    totalReturn: bigint;
    investorsCount: number;
  };
}

// Mock data for development (to be replaced with actual contract calls)
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    creator: '0x1234567890123456789012345678901234567890',
    title: 'AI Development Tools',
    description: 'Building next-generation AI tools for developers',
    goalAmount: BigInt(100000),
    raisedAmount: BigInt(45000),
    deadline: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
    milestones: [
      {
        id: 'milestone_1',
        campaignId: '1',
        title: 'MVP Launch',
        description: 'Launch minimum viable product',
        fundingPercentage: 30,
        isCompleted: false,
        votesFor: 0,
        votesAgainst: 0,
        votingDeadline: Date.now() + 90 * 24 * 60 * 60 * 1000
      },
      {
        id: 'milestone_2',
        campaignId: '1',
        title: 'Series A Funding',
        description: 'Raise Series A funding round',
        fundingPercentage: 40,
        isCompleted: false,
        votesFor: 0,
        votesAgainst: 0,
        votingDeadline: Date.now() + 180 * 24 * 60 * 60 * 1000
      },
      {
        id: 'milestone_3',
        campaignId: '1',
        title: 'Revenue Sharing',
        description: 'Begin revenue sharing with investors',
        fundingPercentage: 30,
        isCompleted: false,
        votesFor: 0,
        votesAgainst: 0,
        votingDeadline: Date.now() + 365 * 24 * 60 * 60 * 1000
      }
    ],
    isActive: true,
    isCompleted: false,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
  }
];

// Utility functions
export const calculateCampaignProgress = (campaign: Campaign): number => {
  return Number(campaign.raisedAmount) / Number(campaign.goalAmount) * 100;
};

export const getCompletedMilestones = (campaign: Campaign): Milestone[] => {
  return campaign.milestones.filter(m => m.isCompleted);
};

export const getNextMilestone = (campaign: Campaign): Milestone | undefined => {
  return campaign.milestones.find(m => !m.isCompleted);
};

export const calculateExpectedReturn = (
  investment: bigint, 
  campaignGoal: bigint, 
  estimatedRevenueMultiplier: number = 2.5
): number => {
  const investmentShare = Number(investment) / Number(campaignGoal);
  return investmentShare * estimatedRevenueMultiplier * 100; // Return as percentage
};
