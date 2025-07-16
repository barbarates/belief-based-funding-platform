
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

export const SOLANA_CONFIG = {
  // Usar devnet para desenvolvimento
  network: 'devnet' as const,
  endpoint: clusterApiUrl('devnet'),
  
  // IDs dos programas (serão definidos após deploy)
  programIds: {
    // PeopleFi Program ID (será gerado após deploy)
    peopleFi: new PublicKey('11111111111111111111111111111111'), // placeholder
    
    // Token Program (SPL)
    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    
    // Associated Token Account Program
    associatedToken: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
    
    // System Program
    system: new PublicKey('11111111111111111111111111111111')
  },
  
  // Configurações de fees e limits
  fees: {
    platformFee: 2.5, // 2.5%
    minInvestment: 0.1, // 0.1 SOL
    maxInvestment: 1000 // 1000 SOL
  }
}

export const createConnection = () => {
  return new Connection(SOLANA_CONFIG.endpoint, 'confirmed')
}

export const CAMPAIGN_ACCOUNT_SIZE = 1000 // bytes aproximados para dados da campanha
export const MILESTONE_ACCOUNT_SIZE = 500 // bytes aproximados para milestone
export const VOTE_ACCOUNT_SIZE = 200 // bytes aproximados para voto
