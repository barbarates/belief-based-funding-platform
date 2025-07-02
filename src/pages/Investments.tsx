
import { useState } from 'react'
import { CampaignCard } from '@/components/Investment/CampaignCard'
import { useWeb3Auth } from '@/hooks/useWeb3Auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Filter, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Investments = () => {
  const navigate = useNavigate()
  const { user, isConnected } = useWeb3Auth()
  const [filter, setFilter] = useState('all')

  const campaigns = [
    {
      id: '1',
      name: 'Alex Chen',
      category: 'AI Startup',
      description: 'Desenvolvendo ferramentas de IA para desenvolvedores',
      goal: 100000,
      raised: 45000,
      backers: 156,
      rating: 4.8,
      timeframe: '2 anos',
      image: '👨‍💻'
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      category: 'Creator',
      description: 'Conteúdo educacional tech com 500K+ seguidores',
      goal: 50000,
      raised: 28000,
      backers: 89,
      rating: 4.9,
      timeframe: '18 meses',
      image: '👩‍🎓'
    },
    {
      id: '3',
      name: 'David Kim',
      category: 'E-commerce',
      description: 'Marca de moda sustentável',
      goal: 150000,
      raised: 72000,
      backers: 203,
      rating: 4.7,
      timeframe: '3 anos',
      image: '👨‍🎨'
    }
  ]

  const handleInvest = (campaignId: string) => {
    if (!isConnected) {
      alert('Conecte sua carteira primeiro!')
      return
    }
    
    // Aqui vamos implementar a lógica de investimento
    console.log('Investindo na campanha:', campaignId)
    navigate(`/invest/${campaignId}`)
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true
    return campaign.category.toLowerCase().includes(filter)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
            <h1 className="text-3xl font-bold text-white">Oportunidades de Investimento</h1>
          </div>
          
          {isConnected && user && (
            <Badge className="bg-green-600/50 text-green-200">
              Carteira Conectada: {user.address.slice(0, 6)}...{user.address.slice(-4)}
            </Badge>
          )}
        </div>

        {/* Filtros */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {['all', 'ai', 'creator', 'e-commerce', 'startup'].map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className={filter === category ? 
                    "bg-purple-600 text-white" : 
                    "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  }
                >
                  {category === 'all' ? 'Todos' : category.toUpperCase()}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campanhas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onInvest={handleInvest}
            />
          ))}
        </div>

        {/* Aviso se não estiver conectado */}
        {!isConnected && (
          <Card className="mt-8 bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="pt-6 text-center">
              <p className="text-yellow-300 mb-4">
                🔒 Conecte sua carteira para investir nas campanhas
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Conectar Carteira
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Investments
