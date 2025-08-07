
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSolanaWallet } from '@/hooks/useSolanaWallet'
import { useContractSecurity } from '@/hooks/useContractSecurity'
import { useKYC } from '@/hooks/useKYC'
import { useSecuritySettings } from '@/hooks/useSecuritySettings'
import { useBlockchainTransactions } from '@/hooks/useBlockchainTransactions'
import { peopleFiContract } from '@/contracts/PeopleFiSmartContract'
import { Shield, Lock, AlertTriangle, CheckCircle, Loader2, FileCheck } from 'lucide-react'
import { toast } from 'sonner'
import { KYCForm } from '../Security/KYCForm'

interface ContractInterfaceProps {
  campaignId: string
  isCreator?: boolean
}

export const ContractInterface: React.FC<ContractInterfaceProps> = ({ 
  campaignId, 
  isCreator = false 
}) => {
  const { wallet } = useSolanaWallet()
  const isConnected = wallet.connected
  const { securityStatus, executeSecureTransaction, validateTransaction } = useContractSecurity(campaignId)
  const { isKYCApproved, needsKYC } = useKYC()
  const { settings: securitySettings, validateInvestment } = useSecuritySettings(campaignId)
  const { recordTransaction, updateTransactionStatus } = useBlockchainTransactions()
  
  const [loading, setLoading] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState('')

  // Enhanced security validation
  const validateInvestmentSecurity = async (amount: string): Promise<string[]> => {
    const errors: string[] = []
    const numAmount = parseFloat(amount)

    if (!isConnected || !wallet.publicKey) {
      errors.push('Carteira não conectada')
      return errors
    }

    // KYC Check
    if (securitySettings?.kyc_required && !isKYCApproved) {
      errors.push('Verificação KYC é obrigatória para investir')
      return errors
    }

    // Amount validation
    if (!amount || numAmount <= 0) {
      errors.push('Valor deve ser maior que zero')
    }

    if (securitySettings) {
      if (numAmount < securitySettings.min_investment_amount) {
        errors.push(`Investimento mínimo: $${securitySettings.min_investment_amount}`)
      }
      if (numAmount > securitySettings.max_investment_amount) {
        errors.push(`Investimento máximo: $${securitySettings.max_investment_amount}`)
      }
    }

    // Backend validation
    if (errors.length === 0) {
      try {
        const backendValidation = await validateInvestment(numAmount, wallet.publicKey.toString())
        if (!backendValidation.isValid) {
          errors.push(backendValidation.errorMessage)
        }
      } catch (error) {
        errors.push('Erro na validação de segurança')
      }
    }

    return errors
  }

  const handleSecureInvestment = async () => {
    if (!isConnected || !wallet.publicKey) {
      toast.error('Conecte sua carteira primeiro')
      return
    }

    const validationErrors = await validateInvestmentSecurity(investmentAmount)
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error))
      return
    }

    setLoading(true)
    try {
      const amount = BigInt(Math.floor(parseFloat(investmentAmount) * 1e18))
      
      // Execute with enhanced security
      const result = await executeSecureTransaction(
        () => peopleFiContract.invest(campaignId, wallet.publicKey!.toString(), amount),
        {
          type: 'invest',
          amount,
          campaignId
        }
      )

      // Record transaction in backend
      await recordTransaction({
        campaign_id: campaignId,
        investor_id: wallet.publicKey!.toString(),
        transaction_hash: result.transactionHash,
        transaction_type: 'investment',
        amount: parseFloat(investmentAmount),
        network_id: 'solana-devnet',
        status: 'pending'
      })

      // Update transaction status when confirmed
      setTimeout(async () => {
        await updateTransactionStatus(result.transactionHash, 'confirmed', result.blockNumber)
      }, 3000)

      toast.success('Investimento realizado com segurança máxima!', {
        description: `TX: ${result.transactionHash.slice(0, 10)}...`
      })

      setInvestmentAmount('')
    } catch (error) {
      console.error('Investment error:', error)
      toast.error('Erro ao processar investimento seguro')
    } finally {
      setLoading(false)
    }
  }

  const SecurityIndicator = () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <Shield className="h-4 w-4 text-green-500" />
        <span className="text-green-600">Protegido por Smart Contract + Backend</span>
        <Badge variant="outline" className="text-xs">
          <Lock className="h-3 w-3 mr-1" />
          Auditado
        </Badge>
      </div>
      
      {/* Security Score */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Score de Segurança:</span>
        <Badge variant={securityStatus.securityScore >= 90 ? 'default' : 'destructive'}>
          {securityStatus.securityScore}/100
        </Badge>
      </div>

      {/* KYC Status */}
      <div className="flex items-center gap-2">
        <FileCheck className="h-4 w-4" />
        <span className="text-sm">KYC:</span>
        <Badge variant={isKYCApproved ? 'default' : 'secondary'}>
          {isKYCApproved ? 'Verificado' : 'Não Verificado'}
        </Badge>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Enhanced Security Status */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-4">
          <SecurityIndicator />
          <p className="text-sm text-gray-600 mt-2">
            Segurança multicamadas: Smart Contract + Backend + KYC + Auditoria
          </p>
          
          {securityStatus.warnings.length > 0 && (
            <Alert className="mt-3">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Avisos: {securityStatus.warnings.join(', ')}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* KYC Section */}
      {needsKYC && (
        <KYCForm />
      )}

      {/* Investment Interface */}
      {!isCreator && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Investimento Ultra Seguro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Valor do Investimento (USD)
              </label>
              <Input
                type="number"
                placeholder="1000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                min={securitySettings?.min_investment_amount || 100}
                max={securitySettings?.max_investment_amount || 10000}
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo: ${securitySettings?.min_investment_amount || 100} | 
                Máximo: ${securitySettings?.max_investment_amount || 10000}
              </p>
              {securitySettings?.kyc_required && (
                <p className="text-xs text-blue-600 mt-1">
                  ⚠️ KYC obrigatório para esta campanha
                </p>
              )}
            </div>

            <Button 
              onClick={handleSecureInvestment}
              disabled={!isConnected || loading || !investmentAmount || (securitySettings?.kyc_required && !isKYCApproved)}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando com Segurança...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Investir com Segurança Máxima
                </>
              )}
            </Button>

            {securitySettings?.kyc_required && !isKYCApproved && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Você precisa completar a verificação KYC antes de investir nesta campanha.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Security Settings Display */}
      {securitySettings && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Configurações de Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Votação:</span>
                <p>{securitySettings.voting_threshold_percentage}% necessário</p>
              </div>
              <div>
                <span className="font-medium">Prazo:</span>
                <p>{securitySettings.milestone_approval_deadline_hours}h para aprovação</p>
              </div>
              <div>
                <span className="font-medium">Pausa de Emergência:</span>
                <Badge variant={securitySettings.emergency_pause_enabled ? 'default' : 'secondary'}>
                  {securitySettings.emergency_pause_enabled ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Apenas Whitelist:</span>
                <Badge variant={securitySettings.whitelist_only ? 'default' : 'secondary'}>
                  {securitySettings.whitelist_only ? 'Sim' : 'Não'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
