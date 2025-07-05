
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useWeb3Auth } from '@/hooks/useWeb3Auth'
import { peopleFiContract } from '@/contracts/PeopleFiSmartContract'
import { Shield, Lock, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ContractInterfaceProps {
  campaignId: string
  isCreator?: boolean
}

export const ContractInterface: React.FC<ContractInterfaceProps> = ({ 
  campaignId, 
  isCreator = false 
}) => {
  const { user, isConnected } = useWeb3Auth()
  const [loading, setLoading] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [contractStatus, setContractStatus] = useState('active')

  // Security validation
  const validateInvestment = (amount: string): string | null => {
    if (!amount || parseFloat(amount) <= 0) {
      return 'Valor deve ser maior que zero'
    }
    if (parseFloat(amount) < 100) {
      return 'Investimento mínimo: $100'
    }
    if (parseFloat(amount) > 10000) {
      return 'Investimento máximo: $10,000'
    }
    return null
  }

  const handleInvestment = async () => {
    if (!isConnected || !user) {
      toast.error('Conecte sua carteira primeiro')
      return
    }

    const validation = validateInvestment(investmentAmount)
    if (validation) {
      toast.error(validation)
      return
    }

    setLoading(true)
    try {
      // Security checks
      const campaign = await peopleFiContract.getCampaign(campaignId)
      if (!campaign.isActive) {
        throw new Error('Campanha não está ativa')
      }

      const amount = BigInt(Math.floor(parseFloat(investmentAmount) * 1e18))
      
      // Execute investment with security validation
      const result = await peopleFiContract.invest(
        campaignId,
        user.address,
        amount
      )

      toast.success('Investimento realizado com sucesso!', {
        description: `TX: ${result.transactionHash.slice(0, 10)}...`
      })

      setInvestmentAmount('')
    } catch (error) {
      console.error('Investment error:', error)
      toast.error('Erro ao processar investimento')
    } finally {
      setLoading(false)
    }
  }

  const handleMilestoneVote = async (milestoneId: string, approve: boolean) => {
    if (!isConnected || !user) return

    setLoading(true)
    try {
      await peopleFiContract.voteOnMilestone(
        campaignId,
        milestoneId,
        user.address,
        approve
      )
      
      toast.success(`Voto ${approve ? 'positivo' : 'negativo'} registrado`)
    } catch (error) {
      console.error('Vote error:', error)
      toast.error('Erro ao votar')
    } finally {
      setLoading(false)
    }
  }

  const SecurityIndicator = () => (
    <div className="flex items-center gap-2 text-sm">
      <Shield className="h-4 w-4 text-green-500" />
      <span className="text-green-600">Protegido por Smart Contract</span>
      <Badge variant="outline" className="text-xs">
        <Lock className="h-3 w-3 mr-1" />
        Auditado
      </Badge>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Security Status */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-4">
          <SecurityIndicator />
          <p className="text-sm text-gray-600 mt-2">
            Seus fundos ficam em custódia segura até que marcos sejam atingidos
          </p>
        </CardContent>
      </Card>

      {/* Investment Interface */}
      {!isCreator && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Investimento Seguro
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
                min="100"
                max="10000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo: $100 | Máximo: $10,000
              </p>
            </div>

            {investmentAmount && validateInvestment(investmentAmount) && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {validateInvestment(investmentAmount)}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleInvestment}
              disabled={!isConnected || loading || !investmentAmount}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Investir com Segurança
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Creator Controls */}
      {isCreator && (
        <Card>
          <CardHeader>
            <CardTitle>Controles do Criador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Como criador, você pode enviar provas de marcos para liberar fundos
              </AlertDescription>
            </Alert>
            
            <Button variant="outline" className="w-full">
              Enviar Prova de Marco
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Contract Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Status do Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant={contractStatus === 'active' ? 'default' : 'secondary'}>
                {contractStatus}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Rede:</span>
              <span>Polygon</span>
            </div>
            <div className="flex justify-between">
              <span>Segurança:</span>
              <Badge variant="outline" className="text-green-600">
                <Shield className="h-3 w-3 mr-1" />
                Alta
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
