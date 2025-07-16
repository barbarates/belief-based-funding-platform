
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  sendAndConfirmTransaction
} from '@solana/web3.js'
import { SOLANA_CONFIG } from '@/config/solana'
import BN from 'bn.js'

export interface SolanaCampaign {
  publicKey: PublicKey
  creator: PublicKey
  title: string
  description: string
  goalAmount: BN
  raisedAmount: BN
  deadline: BN
  isActive: boolean
  milestones: SolanaMilestone[]
  investors: PublicKey[]
  escrowAccount: PublicKey
}

export interface SolanaMilestone {
  id: number
  title: string
  targetAmount: BN
  unlockPercentage: number
  deadline: BN
  isCompleted: boolean
  votesFor: number
  votesAgainst: number
  proofSubmitted: boolean
  proofHash: string
}

export interface SolanaInvestment {
  investor: PublicKey
  campaign: PublicKey
  amount: BN
  timestamp: BN
  tokensReceived: BN
}

export class SolanaPeopleFiProgram {
  private connection: Connection
  private programId: PublicKey

  constructor(connection: Connection, programId?: PublicKey) {
    this.connection = connection
    this.programId = programId || SOLANA_CONFIG.programIds.peopleFi
  }

  // Criar nova campanha
  async createCampaign(
    creator: Keypair,
    title: string,
    description: string,
    goalAmount: number,
    deadline: Date,
    milestones: Omit<SolanaMilestone, 'id' | 'isCompleted' | 'votesFor' | 'votesAgainst' | 'proofSubmitted' | 'proofHash'>[]
  ): Promise<{ signature: string; campaignAccount: PublicKey }> {
    
    // Gerar nova conta para a campanha
    const campaignAccount = Keypair.generate()
    
    // Criar conta de escrow para fundos
    const escrowAccount = Keypair.generate()
    
    // Simular criação por enquanto (sem programa real ainda)
    const mockTransaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: creator.publicKey,
        newAccountPubkey: campaignAccount.publicKey,
        lamports: await this.connection.getMinimumBalanceForRentExemption(1000),
        space: 1000,
        programId: this.programId
      })
    )

    const signature = await sendAndConfirmTransaction(
      this.connection,
      mockTransaction,
      [creator, campaignAccount]
    )

    console.log('🚀 Campanha criada na Solana:', {
      signature,
      campaignAccount: campaignAccount.publicKey.toString(),
      escrowAccount: escrowAccount.publicKey.toString(),
      title,
      goalAmount
    })

    return { 
      signature, 
      campaignAccount: campaignAccount.publicKey 
    }
  }

  // Investir em campanha
  async invest(
    investor: Keypair,
    campaignAccount: PublicKey,
    amount: number
  ): Promise<{ signature: string; investmentAccount: PublicKey }> {
    
    const investmentAccount = Keypair.generate()
    const lamports = amount * LAMPORTS_PER_SOL

    // Transferir SOL para escrow da campanha
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: investor.publicKey,
        toPubkey: campaignAccount, // Em produção seria o escrow
        lamports
      })
    )

    const signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [investor]
    )

    console.log('💰 Investimento realizado na Solana:', {
      signature,
      investor: investor.publicKey.toString(),
      campaign: campaignAccount.toString(),
      amount,
      lamports
    })

    return { 
      signature, 
      investmentAccount: investmentAccount.publicKey 
    }
  }

  // Votar em milestone
  async voteOnMilestone(
    voter: Keypair,
    campaignAccount: PublicKey,
    milestoneId: number,
    approve: boolean
  ): Promise<{ signature: string }> {
    
    const voteAccount = Keypair.generate()

    // Simular votação
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: voter.publicKey,
        newAccountPubkey: voteAccount.publicKey,
        lamports: await this.connection.getMinimumBalanceForRentExemption(200),
        space: 200,
        programId: this.programId
      })
    )

    const signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [voter, voteAccount]
    )

    console.log('🗳️ Voto registrado na Solana:', {
      signature,
      voter: voter.publicKey.toString(),
      campaign: campaignAccount.toString(),
      milestoneId,
      approve
    })

    return { signature }
  }

  // Liberar fundos de milestone
  async releaseMilestoneFunds(
    authority: Keypair,
    campaignAccount: PublicKey,
    milestoneId: number
  ): Promise<{ signature: string; releasedAmount: BN }> {
    
    // Em produção, validaria votos e liberaria fundos do escrow
    const mockReleaseAmount = new BN(1000000000) // 1 SOL em lamports

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: campaignAccount, // escrow
        toPubkey: authority.publicKey, // creator
        lamports: mockReleaseAmount.toNumber()
      })
    )

    // Por enquanto simular
    const signature = 'mock_signature_' + Date.now()

    console.log('💸 Fundos de milestone liberados:', {
      signature,
      campaign: campaignAccount.toString(),
      milestoneId,
      releasedAmount: mockReleaseAmount.toString()
    })

    return { signature, releasedAmount: mockReleaseAmount }
  }

  // Buscar dados da campanha
  async getCampaign(campaignAccount: PublicKey): Promise<SolanaCampaign | null> {
    try {
      // Em produção, deserializaria os dados da conta
      // Por enquanto retornar mock
      return {
        publicKey: campaignAccount,
        creator: new PublicKey('11111111111111111111111111111111'),
        title: 'Campanha Mock Solana',
        description: 'Descrição da campanha',
        goalAmount: new BN(10 * LAMPORTS_PER_SOL),
        raisedAmount: new BN(5 * LAMPORTS_PER_SOL),
        deadline: new BN(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
        milestones: [],
        investors: [],
        escrowAccount: campaignAccount
      }
    } catch (error) {
      console.error('Erro ao buscar campanha:', error)
      return null
    }
  }

  // Buscar investimentos do usuário
  async getUserInvestments(userPublicKey: PublicKey): Promise<SolanaInvestment[]> {
    // Em produção, buscaria contas de investimento do usuário
    return []
  }

  // Utilitários
  static lamportsToSol(lamports: BN): number {
    return lamports.toNumber() / LAMPORTS_PER_SOL
  }

  static solToLamports(sol: number): BN {
    return new BN(sol * LAMPORTS_PER_SOL)
  }

  static formatSol(lamports: BN): string {
    return `${this.lamportsToSol(lamports).toFixed(4)} SOL`
  }
}

// Instância global
export const solanaPeopleFiProgram = new SolanaPeopleFiProgram(
  new Connection(SOLANA_CONFIG.endpoint, 'confirmed')
)
