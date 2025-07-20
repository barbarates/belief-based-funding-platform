import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { SolanaWalletConnection } from '@/components/Solana/SolanaWalletConnection'
import { useSolanaWallet } from '@/hooks/useSolanaWallet'
import { solanaPeopleFiProgram } from '@/contracts/SolanaPeopleFiProgram'
import { toast } from 'sonner'
import { Rocket, TrendingUp, Vote, Coins, Wallet } from 'lucide-react'

export default function SolanaTest() {
  const { wallet, connection } = useSolanaWallet()
  const [loading, setLoading] = useState(false)
  
  // Estados para criar campanha
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    goalAmount: '',
    deadline: ''
  })

  // Estados para investir
  const [investmentForm, setInvestmentForm] = useState({
    campaignId: '',
    amount: ''
  })

  const handleCreateCampaign = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error('Conecte sua wallet primeiro')
      return
    }

    setLoading(true)
    try {
      // Simular keypair do criador (em produção seria assinado pela wallet)
      const mockCreator = {
        publicKey: wallet.publicKey,
        secretKey: new Uint8Array(64) // Mock - em produção seria da wallet
      }

      const result = await solanaPeopleFiProgram.createCampaign(
        mockCreator as any,
        campaignForm.title,
        campaignForm.description,
        parseFloat(campaignForm.goalAmount),
        new Date(campaignForm.deadline),
        []
      )

      toast.success('Campanha criada com sucesso!', {
        description: `ID: ${result.campaignAccount.toString().slice(0, 8)}...`
      })

      setCampaignForm({ title: '', description: '', goalAmount: '', deadline: '' })
    } catch (error) {
      console.error('Erro ao criar campanha:', error)
      toast.error('Erro ao criar campanha')
    } finally {
      setLoading(false)
    }
  }

  const handleInvest = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error('Conecte sua wallet primeiro')
      return
    }

    setLoading(true)
    try {
      // Simular keypair do investidor
      const mockInvestor = {
        publicKey: wallet.publicKey,
        secretKey: new Uint8Array(64)
      }

      const result = await solanaPeopleFiProgram.invest(
        mockInvestor as any,
        investmentForm.campaignId as any,
        parseFloat(investmentForm.amount)
      )

      toast.success('Investimento realizado!', {
        description: `Transação: ${result.signature.slice(0, 8)}...`
      })

      setInvestmentForm({ campaignId: '', amount: '' })
    } catch (error) {
      console.error('Erro ao investir:', error)
      toast.error('Erro ao processar investimento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🚀 PeopleFi Solana Integration
        </h1>
        <p className="text-lg text-muted-foreground">
          Teste completo da integração com blockchain Solana
        </p>
        <Badge variant="secondary" className="text-sm">
          Rede: Solana Devnet
        </Badge>
      </div>

      {/* Status da Wallet */}
      <div className="flex justify-center">
        <SolanaWalletConnection />
      </div>

      {wallet.connected ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Criar Campanha */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Criar Campanha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Campanha</Label>
                <Input
                  id="title"
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Startup Inovadora"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva sua campanha..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal">Meta (SOL)</Label>
                  <Input
                    id="goal"
                    type="number"
                    step="0.1"
                    value={campaignForm.goalAmount}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, goalAmount: e.target.value }))}
                    placeholder="10.0"
                  />
                </div>

                <div>
                  <Label htmlFor="deadline">Prazo</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={campaignForm.deadline}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={handleCreateCampaign}
                disabled={loading || !campaignForm.title || !campaignForm.goalAmount}
                className="w-full"
              >
                {loading ? 'Criando...' : 'Criar Campanha na Solana'}
              </Button>
            </CardContent>
          </Card>

          {/* Investir */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Fazer Investimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaignId">ID da Campanha</Label>
                <Input
                  id="campaignId"
                  value={investmentForm.campaignId}
                  onChange={(e) => setInvestmentForm(prev => ({ ...prev, campaignId: e.target.value }))}
                  placeholder="Cole o endereço da campanha"
                />
              </div>

              <div>
                <Label htmlFor="amount">Valor (SOL)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.1"
                  value={investmentForm.amount}
                  onChange={(e) => setInvestmentForm(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="1.0"
                />
              </div>

              <div className="text-sm text-muted-foreground p-3 bg-secondary/20 rounded-lg">
                <p><strong>Seu saldo:</strong> {wallet.balance.toFixed(4)} SOL</p>
                <p><strong>Taxa de rede:</strong> ~0.001 SOL</p>
              </div>

              <Button 
                onClick={handleInvest}
                disabled={loading || !investmentForm.campaignId || !investmentForm.amount}
                className="w-full"
              >
                {loading ? 'Processando...' : 'Investir na Solana'}
              </Button>
            </CardContent>
          </Card>

        </div>
      ) : (
        <Card className="text-center p-8">
          <CardContent>
            <Wallet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Wallet Desconectada</h3>
            <p className="text-muted-foreground mb-4">
              Conecte sua Phantom Wallet para testar as funcionalidades Solana
            </p>
          </CardContent>
        </Card>
      )}

      {/* Funcionalidades Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>🛠️ Funcionalidades Implementadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Rocket className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold">Criar Campanhas</div>
                <div className="text-sm text-muted-foreground">Smart contracts na Solana</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Coins className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold">Investimentos</div>
                <div className="text-sm text-muted-foreground">Transferências SOL</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Vote className="h-8 w-8 text-purple-600" />
              <div>
                <div className="font-semibold">Votação</div>
                <div className="text-sm text-muted-foreground">Governança on-chain</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}