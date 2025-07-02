
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useWeb3Auth } from '@/hooks/useWeb3Auth'
import { ArrowLeft, DollarSign, Target, Users, Star, Calendar, CheckCircle } from 'lucide-react'

const InvestmentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isConnected } = useWeb3Auth()
  const [investmentAmount, setInvestmentAmount] = useState('')

  // Mock data - em produção viria de uma API
  const campaign = {
    id: '1',
    name: 'Alex Chen',
    category: 'AI Startup Founder',
    description: 'Desenvolvendo ferramentas de IA de próxima geração para desenvolvedores. Já tenho um MVP funcionando e estou buscando investimento para expandir a equipe e acelerar o desenvolvimento.',
    goal: 100000,
    raised: 45000,
    backers: 156,
    rating: 4.8,
    timeframe: '2 anos',
    image: '👨‍💻',
    milestones: [
      { title: 'Lançar MVP', description: 'Produto mínimo viável funcionando', completed: true, date: '2024-01-15' },
      { title: 'Conseguir primeiros 1000 usuários', description: 'Base de usuários estabelecida', completed: true, date: '2024-03-20' },
      { title: 'Fechar Série A', description: 'Investimento de R$ 2M', completed: false, date: '2024-08-15' },
      { title: 'Começar revenue sharing', description: 'Início dos retornos para investidores', completed: false, date: '2024-12-01' }
    ],
    expectedReturns: '15-25% ao ano',
    riskLevel: 'Médio',
    investmentType: 'Revenue Sharing'
  }

  const progress = (campaign.raised / campaign.goal) * 100

  const handleInvest = () => {
    if (!isConnected) {
      alert('Conecte sua carteira primeiro!')
      return
    }
    
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      alert('Digite um valor válido!')
      return
    }

    // Aqui implementaremos a lógica do smart contract
    console.log(`Investindo $${investmentAmount} na campanha ${id}`)
    alert(`Investimento de $${investmentAmount} realizado com sucesso!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/investments')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-white">Detalhes do Investimento</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Informações principais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Perfil */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{campaign.image}</span>
                  <div>
                    <CardTitle className="text-white text-2xl">{campaign.name}</CardTitle>
                    <Badge className="bg-purple-600/50 text-purple-200 mt-2">
                      {campaign.category}
                    </Badge>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-white font-semibold">{campaign.rating}</span>
                      <span className="text-gray-300">({campaign.backers} avaliações)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{campaign.description}</p>
              </CardContent>
            </Card>

            {/* Progresso */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progresso da Campanha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Arrecadado</span>
                    <span>${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-300">${campaign.raised.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Arrecadado</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-300">{campaign.backers}</div>
                    <div className="text-sm text-gray-400">Investidores</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-300">{Math.round(progress)}%</div>
                    <div className="text-sm text-gray-400">Completado</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Marcos do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaign.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-black/20">
                      <div className={`mt-1 ${milestone.completed ? 'text-green-400' : 'text-gray-400'}`}>
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${milestone.completed ? 'text-green-300' : 'text-white'}`}>
                            {milestone.title}
                          </h3>
                          <span className="text-sm text-gray-400">{milestone.date}</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de investimento */}
          <div className="space-y-6">
            {/* Card de investimento */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Fazer Investimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Valor do Investimento ($)</label>
                  <input
                    type="number"
                    placeholder="Ex: 1000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="bg-black/20 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Retorno Esperado:</span>
                    <span className="text-green-400 font-semibold">{campaign.expectedReturns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tipo de Investimento:</span>
                    <span className="text-blue-400">{campaign.investmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Nível de Risco:</span>
                    <span className="text-yellow-400">{campaign.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Prazo:</span>
                    <span className="text-purple-400">{campaign.timeframe}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleInvest}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={!isConnected}
                >
                  {!isConnected ? 'Conecte sua Carteira' : 'Investir Agora'}
                </Button>

                {!isConnected && (
                  <p className="text-sm text-yellow-300 text-center">
                    🔒 Conecte sua carteira para investir
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Informações adicionais */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Investidores Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">0x1234...5678</span>
                    <span className="text-green-400">$2,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">0x9876...4321</span>
                    <span className="text-green-400">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">0x5555...9999</span>
                    <span className="text-green-400">$750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentDetail
