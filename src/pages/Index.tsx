import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Users, DollarSign, Star, Clock, CheckCircle, Wallet } from "lucide-react";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";

const Index = () => {
  const { isConnected, connectWallet, address } = useWeb3Auth();

  const featuredPeople = [
    {
      id: 1,
      name: "Alex Chen",
      category: "AI Startup Founder", 
      description: "Building next-gen AI tools for developers",
      raised: 45000,
      goal: 100000,
      backers: 156,
      rating: 4.8,
      estimatedReturn: "15-25%",
      timeframe: "2 years",
      milestones: ["Launch MVP", "Raise Series A", "Revenue sharing begins"],
      image: "👨‍💻"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      category: "Content Creator",
      description: "Educational tech content with 500K+ followers",
      raised: 28000,
      goal: 50000,
      backers: 89,
      rating: 4.9,
      estimatedReturn: "10-20%",
      timeframe: "18 months",
      milestones: ["Course launch", "Brand partnerships", "Revenue sharing"],
      image: "👩‍🎓"
    },
    {
      id: 3,
      name: "David Kim",
      category: "E-commerce Entrepreneur",
      description: "Sustainable fashion brand disrupting fast fashion",
      raised: 72000,
      goal: 150000,
      backers: 203,
      rating: 4.7,
      estimatedReturn: "20-30%",
      timeframe: "3 years",
      milestones: ["Product launch", "Retail partnerships", "IPO consideration"],
      image: "👨‍🎨"
    }
  ];

  const safetyFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Smart Contract Escrow",
      description: "Funds locked in blockchain escrow until milestones are met"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Milestone-Based Release",
      description: "Money released only when predetermined goals are achieved"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Verification", 
      description: "Peer review and verification of progress by other investors"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Performance Tracking",
      description: "Real-time tracking of progress and transparent reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header with Wallet Connection */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Button 
            onClick={isConnected ? () => window.location.href = '/dashboard' : connectWallet}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Conectar Carteira'}
          </Button>
          
          {isConnected && (
            <Badge className="bg-green-600/50 text-green-200">
              Conectado ✓
            </Badge>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PeopleFi
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Invista no potencial das pessoas. Apoie a próxima geração de inovadores, criadores e empreendedores.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => window.location.href = '/investments'}
            >
              Começar a Investir
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              onClick={() => window.location.href = '/profile/apply'}
            >
              Candidatar-se para Financiamento
            </Button>
          </div>
        </div>

        {/* Safety & Returns Explanation */}
        <Card className="mb-16 bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-400" />
              Como Seu Investimento é Protegido e Como Funcionam as Retornos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-300">Mecanismos de Segurança:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Smart Contract Escrow:</strong> Seus fundos estão preservados em escrow blockchain e liberados apenas quando os objetivos específicos forem alcançados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Verificação de Milestones:</strong> A comunidade vota se os objetivos foram alcançados antes da liberação dos fundos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Sistema de Reputação:</strong> Apenas indivíduos verificados com histórico de sucesso podem solicitar financiamento</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-300">Como Você Recebe Retornos:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Compartilhamento de Receita:</strong> Receba uma porcentagem de seus futuros rendimentos por um período determinado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Tokens de Ação Tokenizados:</strong> Receba tokens de ação tokenizados que podem crescer e ser negociados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Bônus de Sucesso:</strong> Retornos extras quando eles alcançam os principais objetivos (IPO, aquisição, etc.)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Investment Opportunities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Oportunidades de Investimento em Destaque</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPeople.map((person) => (
              <Card key={person.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{person.image}</span>
                    <div>
                      <CardTitle className="text-white text-lg">{person.name}</CardTitle>
                      <Badge variant="secondary" className="bg-purple-600/50 text-purple-200">
                        {person.category}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-300">
                    {person.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Progresso</span>
                      <span>${person.raised.toLocaleString()} / ${person.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={(person.raised / person.goal) * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-purple-300 font-semibold">{person.backers}</div>
                      <div className="text-gray-400">Backers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-300 font-semibold flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        {person.rating}
                      </div>
                      <div className="text-gray-400">Rating</div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Retorno Esperado:</span>
                      <span className="text-green-400 font-semibold">{person.estimatedReturn}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Tempo de Execução:</span>
                      <span className="text-blue-400">{person.timeframe}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-300 mb-2">Próximos Objetivos:</div>
                    <div className="space-y-1">
                      {person.milestones.slice(0, 2).map((milestone, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {milestone}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => window.location.href = `/invest/${person.id}`}
                  >
                    Investir Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              onClick={() => window.location.href = '/investments'}
            >
              Ver Todas as Oportunidades
            </Button>
          </div>
        </div>

        {/* Safety Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Construído para Segurança e Transparência</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
                <CardContent className="pt-6">
                  <div className="text-purple-400 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-lg border-white/20">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold text-white mb-4">Pronto para Investir no Futuro?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de investidores apoiando a próxima geração de inovadores. Comece com apenas $100.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-900 hover:bg-gray-100"
                onClick={() => window.location.href = '/investments'}
              >
                Ver Investimentos
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-900"
                onClick={() => window.location.href = '/dashboard'}
              >
                Saber Mais
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
