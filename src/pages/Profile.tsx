
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Star, Users, DollarSign } from 'lucide-react'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Dados mockados - depois vamos buscar da blockchain
  const profile = {
    id: id,
    name: 'Alex Chen',
    category: 'AI Startup',
    description: 'Desenvolvendo ferramentas de IA para desenvolvedores',
    image: '👨‍💻',
    rating: 4.8,
    totalRaised: 45000,
    backers: 156,
    projects: ['AI Dev Tools', 'Code Assistant', 'ML Platform']
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/investments')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-white">Perfil do Criador</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{profile.image}</div>
                <CardTitle className="text-white text-2xl">{profile.name}</CardTitle>
                <Badge className="bg-purple-600/50 text-purple-200">
                  {profile.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-yellow-400 flex items-center justify-center gap-1 text-lg">
                    <Star className="h-5 w-5" />
                    {profile.rating}
                  </div>
                  <div className="text-gray-400">Avaliação</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-green-400 font-bold text-lg">
                      ${profile.totalRaised.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Total Arrecadado</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold text-lg flex items-center justify-center gap-1">
                      <Users className="h-4 w-4" />
                      {profile.backers}
                    </div>
                    <div className="text-gray-400 text-sm">Investidores</div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Investir Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{profile.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Projetos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {profile.projects.map((project, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4">
                      <h3 className="text-white font-semibold">{project}</h3>
                      <p className="text-gray-400 text-sm">Em desenvolvimento</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
