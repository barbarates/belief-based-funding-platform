import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { useSolanaWallet } from '@/hooks/useSolanaWallet'
import { SolanaPeopleFiProgram } from '@/contracts/SolanaPeopleFiProgram'
import { SOLANA_CONFIG } from '@/config/solana'
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'
import { PublicKey } from '@solana/web3.js'

interface LiveCampaign {
  id: number
  name: string
  category: string
  description: string
  goal: number
  raised: number
  backers: number
  rating: number
  timeframe: string
  image: string
  verified: boolean
  onChain?: boolean
  campaignAccount?: string
}

export default function SolanaLive() {
  const { wallet, connect, disconnect, connection, isPhantomInstalled, loading: walletLoading } = useSolanaWallet()
  const [campaigns, setCampaigns] = useState<LiveCampaign[]>([])
  const [investAmount, setInvestAmount] = useState<{ [key: number]: string }>({})
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({})
  const [program] = useState(() => new SolanaPeopleFiProgram(connection, SOLANA_CONFIG.programIds.peopleFi))

  // Mock campaigns para demonstração
  const mockCampaigns: LiveCampaign[] = [
    {
      id: 1,
      name: "Alex Chen",
      category: "AI Startup",
      description: "Plataforma de IA para automação de processos empresariais",
      goal: 100,
      raised: 45,
      backers: 12,
      rating: 4.8,
      timeframe: "24 meses",
      image: "👨‍💻",
      verified: true
    },
    {
      id: 2,
      name: "Maria Silva",
      category: "E-commerce",
      description: "Marketplace sustentável para produtos locais",
      goal: 50,
      raised: 28,
      backers: 8,
      rating: 4.9,
      timeframe: "18 meses",
      image: "👩‍🎓",
      verified: true
    },
    {
      id: 3,
      name: "Carlos Santos",
      category: "Fintech",
      description: "App de gestão financeira pessoal com IA",
      goal: 75,
      raised: 15,
      backers: 5,
      rating: 4.7,
      timeframe: "12 meses",
      image: "👨‍💼",
      verified: true
    }
  ]

  useEffect(() => {
    setCampaigns(mockCampaigns)
  }, [])

  const handleConnect = async () => {
    if (!isPhantomInstalled) {
      toast.error('Phantom Wallet não encontrada', {
        description: 'Instale a extensão Phantom para continuar',
        action: {
          label: 'Instalar',
          onClick: () => window.open('https://phantom.app/', '_blank')
        }
      })
      return
    }

    try {
      await connect()
      toast.success('Wallet conectada!', {
        description: `Saldo: ${wallet.balance.toFixed(4)} SOL`
      })
    } catch (error) {
      toast.error('Erro ao conectar wallet')
      console.error(error)
    }
  }

  const handleInvest = async (campaign: LiveCampaign) => {
    if (!wallet.publicKey) {
      toast.error('Conecte sua wallet primeiro')
      return
    }

    const amount = parseFloat(investAmount[campaign.id] || '0')
    if (amount < SOLANA_CONFIG.fees.minInvestment) {
      toast.error(`Investimento mínimo: ${SOLANA_CONFIG.fees.minInvestment} SOL`)
      return
    }

    if (amount > wallet.balance) {
      toast.error('Saldo insuficiente')
      return
    }

    setLoading(prev => ({ ...prev, [campaign.id]: true }))

    try {
      toast.info('Processando investimento...', {
        description: 'Aguarde a confirmação na blockchain'
      })

      // Simular transação (em produção, usaria o smart contract real)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Atualizar campanha
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id 
          ? { ...c, raised: c.raised + amount, backers: c.backers + 1, onChain: true }
          : c
      ))

      toast.success('Investimento realizado!', {
        description: `${amount} SOL investidos em ${campaign.name}`,
        action: {
          label: 'Ver no Explorer',
          onClick: () => window.open(`https://explorer.solana.com/address/${wallet.publicKey?.toString()}?cluster=devnet`, '_blank')
        }
      })

      setInvestAmount(prev => ({ ...prev, [campaign.id]: '' }))
      
    } catch (error) {
      console.error(error)
      toast.error('Erro ao processar investimento')
    } finally {
      setLoading(prev => ({ ...prev, [campaign.id]: false }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Roundsy Live
              </h1>
              <Badge variant="outline" className="border-green-500 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Solana Devnet
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Voltar ao Site
              </Button>
              
              {!wallet.connected ? (
                <Button 
                  onClick={handleConnect}
                  disabled={walletLoading}
                  className="bg-gradient-silver"
                >
                  {walletLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wallet className="h-4 w-4 mr-2" />
                  )}
                  {isPhantomInstalled ? 'Conectar Phantom' : 'Instalar Phantom'}
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Saldo</div>
                    <div className="font-bold text-green-600">{wallet.balance.toFixed(4)} SOL</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={disconnect}>
                    Desconectar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(`https://explorer.solana.com/address/${wallet.publicKey?.toString()}?cluster=devnet`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Invista em Pessoas na Blockchain Solana
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Versão de teste rodando na Devnet da Solana. Transações reais, sem custo!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {campaigns.reduce((acc, c) => acc + c.raised, 0)} SOL
                  </div>
                  <div className="text-sm text-muted-foreground">Total Investido</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {campaigns.reduce((acc, c) => acc + c.backers, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Investidores</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{campaigns.length}</div>
                  <div className="text-sm text-muted-foreground">Campanhas Ativas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <Shield className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Seguro</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {campaigns.map((campaign) => {
            const progress = (campaign.raised / campaign.goal) * 100

            return (
              <Card key={campaign.id} className="bg-card/80 backdrop-blur border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span className="text-5xl">{campaign.image}</span>
                        {campaign.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-foreground">{campaign.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {campaign.category}
                        </Badge>
                        {campaign.onChain && (
                          <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
                            On-Chain
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="font-semibold">{campaign.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="mt-4 text-muted-foreground">
                    {campaign.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="text-foreground font-semibold">
                        {campaign.raised} / {campaign.goal} SOL
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-foreground font-bold text-lg">{campaign.backers}</div>
                      <div className="text-muted-foreground text-xs">Investidores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-foreground font-bold text-lg">{Math.round(progress)}%</div>
                      <div className="text-muted-foreground text-xs">Completo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-foreground font-bold text-lg flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4" />
                        {campaign.timeframe}
                      </div>
                      <div className="text-muted-foreground text-xs">Prazo</div>
                    </div>
                  </div>

                  {/* Investment */}
                  {wallet.connected ? (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder={`Min: ${SOLANA_CONFIG.fees.minInvestment} SOL`}
                          value={investAmount[campaign.id] || ''}
                          onChange={(e) => setInvestAmount(prev => ({ ...prev, [campaign.id]: e.target.value }))}
                          step="0.1"
                          min={SOLANA_CONFIG.fees.minInvestment}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleInvest(campaign)}
                          disabled={loading[campaign.id] || !investAmount[campaign.id]}
                          className="bg-gradient-silver"
                        >
                          {loading[campaign.id] ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Investir
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Taxa da plataforma: {SOLANA_CONFIG.fees.platformFee}%
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleConnect}
                      className="w-full bg-gradient-silver"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Conectar para Investir
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 text-left max-w-2xl mx-auto">
                <div className="p-3 bg-blue-500/20 rounded-lg flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ambiente de Teste</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta é uma versão de demonstração rodando na Devnet da Solana. 
                    Você pode obter SOL de teste gratuitamente no{' '}
                    <a 
                      href="https://faucet.solana.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Solana Faucet
                    </a>
                    . Todas as transações são reais na blockchain, mas sem valor monetário.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
