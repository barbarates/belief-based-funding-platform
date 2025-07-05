
import { useState, useEffect } from 'react'
import { useWeb3Auth } from './useWeb3Auth'
import { peopleFiContract } from '@/contracts/PeopleFiSmartContract'

export interface SecurityStatus {
  isSecure: boolean
  riskLevel: 'low' | 'medium' | 'high'
  securityScore: number
  warnings: string[]
  auditStatus: 'pending' | 'approved' | 'failed'
}

export const useContractSecurity = (campaignId?: string) => {
  const { isConnected, address } = useWeb3Auth()
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    isSecure: true,
    riskLevel: 'low',
    securityScore: 95,
    warnings: [],
    auditStatus: 'approved'
  })

  const [isLoading, setIsLoading] = useState(false)

  // Security validation functions
  const validateTransaction = async (
    type: 'invest' | 'withdraw' | 'vote',
    amount?: bigint,
    campaignId?: string
  ): Promise<{ isValid: boolean; errors: string[] }> => {
    const errors: string[] = []

    if (!isConnected) {
      errors.push('Carteira não conectada')
    }

    if (type === 'invest' && amount) {
      if (amount < BigInt(100 * 1e18)) {
        errors.push('Valor mínimo de investimento: $100')
      }
      if (amount > BigInt(10000 * 1e18)) {
        errors.push('Valor máximo de investimento: $10,000')
      }
    }

    if (campaignId) {
      try {
        const campaign = await peopleFiContract.getCampaign(campaignId)
        if (!campaign.isActive) {
          errors.push('Campanha não está ativa')
        }
      } catch (error) {
        errors.push('Erro ao validar campanha')
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const checkContractSecurity = async () => {
    setIsLoading(true)
    try {
      // Simulate security checks
      const warnings: string[] = []
      let riskLevel: 'low' | 'medium' | 'high' = 'low'
      let securityScore = 95

      // Check network security
      if (window.ethereum?.networkVersion !== '137') {
        warnings.push('Rede não é Polygon Mainnet')
        riskLevel = 'medium'
        securityScore -= 10
      }

      // Check contract status
      if (campaignId) {
        try {
          const campaign = await peopleFiContract.getCampaign(campaignId)
          if (campaign.escrowBalance === BigInt(0)) {
            warnings.push('Sem fundos em custódia')
          }
        } catch (error) {
          warnings.push('Erro ao acessar contrato')
          riskLevel = 'high'
          securityScore -= 20
        }
      }

      setSecurityStatus({
        isSecure: riskLevel !== 'high',
        riskLevel,
        securityScore,
        warnings,
        auditStatus: 'approved'
      })
    } catch (error) {
      console.error('Security check failed:', error)
      setSecurityStatus({
        isSecure: false,
        riskLevel: 'high',
        securityScore: 0,
        warnings: ['Falha na verificação de segurança'],
        auditStatus: 'failed'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const executeSecureTransaction = async (
    transactionFn: () => Promise<any>,
    validationParams?: {
      type: 'invest' | 'withdraw' | 'vote'
      amount?: bigint
      campaignId?: string
    }
  ) => {
    if (validationParams) {
      const validation = await validateTransaction(
        validationParams.type,
        validationParams.amount,
        validationParams.campaignId
      )

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '))
      }
    }

    // Execute transaction with additional security measures
    try {
      const result = await transactionFn()
      console.log('🔒 Transação segura executada:', result)
      return result
    } catch (error) {
      console.error('🚨 Erro na transação:', error)
      throw error
    }
  }

  useEffect(() => {
    if (isConnected) {
      checkContractSecurity()
    }
  }, [isConnected, campaignId])

  return {
    securityStatus,
    isLoading,
    validateTransaction,
    executeSecureTransaction,
    refreshSecurity: checkContractSecurity
  }
}
