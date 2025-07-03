
import { useNavigate } from 'react-router-dom'
import { useWeb3Auth } from '@/hooks/useWeb3Auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Wallet, TrendingUp, Users, DollarSign } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, isConnected, balance } = useWeb3Auth()

  // Dados mockados do investidor
  const investmentData = {
    totalInvested: 25000,
    activeInvestments: 8,
    totalReturns: 3200,
    portfolioValue: 28200
  }

  const investments = [
    { id: '1', name: 'Alex Chen', amount: 5000, returns: 800, status: 'active' },
    { id: '2', name: 'Maria Rodriguez', amount: 3000, returns: 450, status: 'active' },
    { id: '3', name: 'David Kim', amount: 7000, returns: 1200, status: 'completed' }
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-white mb-4">Conecte sua carteira para ver o dashboard</p>
            <Button onClick={() => navigate('/')}>
              Conectar Carteira
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-white">Meu Dashboard</h1>
          </div>
          
          <Badge className="bg-green-600/50 text-green-200">
            <Wallet className="h-4 w-4 mr-2" />
            {balance} ETH
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Investido</p>
                  <p className="text-white text-2xl font-bold">
                    ${investmentData.totalInvested.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Investimentos Ativos</p>
                  <p className="text-white text-2xl font-bold">{investmentData.activeInvestments}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Retornos Totais</p>
                  <p className="text-white text-2xl font-bold">
                    ${investmentData.totalReturns.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Valor do Portfolio</p>
                  <p className="text-white text-2xl font-bold">
                    ${investmentData.portfolioValue.toLocaleString()}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investments List */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Meus Investimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="bg-black/20 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{investment.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Investido: ${investment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">
                      +${investment.returns.toLocaleString()}
                    </p>
                    <Badge 
                      className={investment.status === 'active' ? 
                        'bg-blue-600/50 text-blue-200' : 
                        'bg-green-600/50 text-green-200'
                      }
                    >
                      {investment.status === 'active' ? 'Ativo' : 'Concluído'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
