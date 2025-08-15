
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Shield, 
  Users, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle, 
  Wallet, 
  ArrowRight, 
  Target, 
  Award, 
  Repeat,
  Network,
  Sparkles,
  ChevronRight,
  Globe,
  Zap
} from "lucide-react";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { useLanguage } from "@/hooks/useLanguage";
import atriafiLogo from "@/assets/atrafi-logo.png";
import atriafiHeroBg from "@/assets/atrafi-hero-bg.png";
import atriafiElements from "@/assets/atrafi-decorative-elements.png";

const Index = () => {
  const { wallet, connect } = useSolanaWallet();
  const isConnected = wallet.connected;
  const address = wallet.publicKey?.toString();
  const { language, t, changeLanguage, availableLanguages } = useLanguage();

  const featuredPeople = [
    {
      id: 1,
      name: "Alex Chen",
      category: "AI Startup Founder", 
      description: t('alex_description'),
      raised: 45000,
      goal: 100000,
      backers: 156,
      rating: 4.8,
      estimatedReturn: "15-25%",
      timeframe: "2 years",
      milestones: [t('milestone_mvp'), t('milestone_series_a'), t('milestone_revenue')],
      image: "👨‍💻",
      verified: true,
      growth: "+24%"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      category: "Content Creator",
      description: t('maria_description'),
      raised: 28000,
      goal: 50000,
      backers: 89,
      rating: 4.9,
      estimatedReturn: "10-20%",
      timeframe: "18 months",
      milestones: [t('milestone_course'), t('milestone_partnerships'), t('milestone_revenue')],
      image: "👩‍🎓",
      verified: true,
      growth: "+18%"
    },
    {
      id: 3,
      name: "David Kim",
      category: "E-commerce Entrepreneur",
      description: t('david_description'),
      raised: 72000,
      goal: 150000,
      backers: 203,
      rating: 4.7,
      estimatedReturn: "20-30%",
      timeframe: "3 years",
      milestones: [t('milestone_launch'), t('milestone_retail'), t('milestone_ipo')],
      image: "👨‍🎨",
      verified: true,
      growth: "+32%"
    }
  ];

  const safetyFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('smart_contract_escrow'),
      description: t('smart_contract_description'),
      color: "from-sage-green to-teal"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('milestone_based_release'),
      description: t('milestone_description'),
      color: "from-teal to-sage-green"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('community_verification'), 
      description: t('community_description'),
      color: "from-sage-green-light to-teal-light"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('performance_tracking'),
      description: t('performance_description'),
      color: "from-teal-light to-sage-green"
    }
  ];

  const stats = [
    { label: t('total_invested'), value: "$2.4M", growth: "+127%", icon: <DollarSign className="h-5 w-5" /> },
    { label: t('active_investors'), value: "1,247", growth: "+89%", icon: <Users className="h-5 w-5" /> },
    { label: t('success_rate'), value: "94.2%", growth: "+12%", icon: <Star className="h-5 w-5" /> },
    { label: t('avg_return'), value: "23.5%", growth: "+8%", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {t('title')}
                </h1>
              </div>
              
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <a href="#opportunities" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {t('opportunities')}
                </a>
                <a href="#safety" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {t('safety')}
                </a>
                <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {t('dashboard')}
                </a>
                <a href="/solana-test" className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:shadow-elegant transition-all font-medium">
                  🚀 Testar Solana
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <select 
                value={language} 
                onChange={(e) => changeLanguage(e.target.value as any)}
                className="bg-card text-card-foreground border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:border-transparent cursor-pointer"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="pt">🇧🇷 PT</option>
                <option value="es">🇪🇸 ES</option>
              </select>

              {/* Wallet Connection */}
              <Button 
                onClick={isConnected ? () => window.location.href = '/dashboard' : connect}
                className="bg-gradient-cosmic hover:shadow-elegant font-medium"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : t('connectWallet')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${atriafiHeroBg})` }}
        ></div>
        
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-7xl mx-auto">
            {/* Título Principal */}
            <div className="mb-16">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                  AtriaFi
                </span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-stellar-silver/90 mb-8 max-w-5xl mx-auto leading-relaxed font-medium">
                {t("subtitle")}
              </p>
              
              <Badge className="mb-12 bg-cosmic-lilac/20 text-cosmic-lilac border-cosmic-lilac/30 font-medium text-lg px-8 py-3">
                <Sparkles className="h-5 w-5 mr-2" />
                {t("platform_badge")}
              </Badge>
            </div>
            
            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              <Button 
                size="lg" 
                className="bg-gradient-cosmic hover:shadow-cosmic text-xl px-16 py-8 font-medium rounded-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = "/investments"}
              >
                <Target className="h-6 w-6 mr-3" />
                {t("startInvesting")}
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cosmic-lilac text-cosmic-lilac hover:bg-cosmic-lilac/10 text-xl px-16 py-8 font-medium rounded-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = "/profile/apply"}
              >
                <Award className="h-6 w-6 mr-3" />
                {t("apply_funding")}
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, idx) => (
                <Card key={idx} className="bg-card/60 backdrop-blur-xl border-border/50 hover:shadow-cosmic transition-all duration-500 transform hover:scale-105">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="flex justify-center mb-4 text-cosmic-lilac">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-muted-foreground text-sm mb-4 font-medium">{stat.label}</div>
                    <Badge className="bg-teal/20 text-teal-dark text-xs font-medium">
                      {stat.growth}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cosmic-lilac rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cosmic-lilac rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section id="safety" className="py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-teal/20 text-teal-dark border-teal/30 font-medium">
              <Shield className="h-4 w-4 mr-2" />
              {t('security_first')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{t('safetyBuiltTitle')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {t('safety_description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, idx) => (
              <Card key={idx} className="group bg-card/80 backdrop-blur-sm border-border hover:border-sage-green/50 hover:shadow-soft transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-foreground font-semibold mb-3 text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments */}
      <section id="opportunities" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-sage-green/20 text-sage-green-dark border-sage-green/30 font-medium">
              <Repeat className="h-4 w-4 mr-2" />
              {t('trending_now')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{t('featuredTitle')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {t('featured_description')}
            </p>
          </div>
          
          <div className="space-y-8">
            {featuredPeople.map((person) => (
              <Card key={person.id} className="group bg-card/80 backdrop-blur-sm border-border hover:border-sage-green/50 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Profile Section */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <span className="text-5xl">{person.image}</span>
                          {person.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-teal rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{person.name}</h3>
                          <Badge variant="secondary" className="bg-sage-green/20 text-sage-green-dark mb-2">
                            {person.category}
                          </Badge>
                          <div>
                            <Badge className="bg-teal/20 text-teal-dark">
                              {person.growth}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">{person.description}</p>
                    </div>

                    {/* Progress & Stats */}
                    <div className="flex-grow">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground font-medium">{t('progress')}</span>
                            <span className="text-foreground font-semibold">
                              ${person.raised.toLocaleString()} / ${person.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={(person.raised / person.goal) * 100} className="h-3" />
                          
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                              <div className="text-sage-green font-bold text-lg">{person.backers}</div>
                              <div className="text-muted-foreground text-xs font-medium">{t('backers')}</div>
                            </div>
                            <div className="text-center">
                               <div className="text-teal font-bold text-lg flex items-center justify-center gap-1">
                                 <Star className="h-4 w-4" />
                                 {person.rating}
                              </div>
                              <div className="text-muted-foreground text-xs font-medium">{t('rating')}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-teal font-bold text-lg">{person.estimatedReturn}</div>
                              <div className="text-muted-foreground text-xs font-medium">{t('expected_return')}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-xl p-6">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-muted-foreground text-sm flex items-center gap-2 font-medium">
                              <Clock className="h-4 w-4" />
                              {t('timeframe')}:
                            </span>
                            <span className="text-teal font-semibold">{person.timeframe}</span>
                          </div>
                          
                          <div>
                            <div className="text-muted-foreground text-sm mb-3 font-medium">{t('next_milestones')}:</div>
                            <div className="space-y-2">
                              {person.milestones.slice(0, 3).map((milestone, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-foreground">
                                  <div className="w-2 h-2 bg-sage-green rounded-full"></div>
                                  {milestone}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0 flex items-center">
                      <Button 
                        size="lg"
                        className="bg-gradient-primary hover:shadow-elegant group-hover:scale-105 transition-all duration-300 px-8 font-medium"
                        onClick={() => window.location.href = `/invest/${person.id}`}
                      >
                        <DollarSign className="h-5 w-5 mr-2" />
                        {t('invest_now')}
                        <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-sage-green text-sage-green hover:bg-sage-green/10 font-medium"
              onClick={() => window.location.href = '/investments'}
            >
              {t('view_all_opportunities')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-warm">
        <div className="container mx-auto px-6">
          <Card className="bg-card/90 backdrop-blur-xl border-border shadow-elegant">
            <CardContent className="text-center py-16">
              <div className="max-w-3xl mx-auto">
                 <Badge className="mb-8 bg-teal/20 text-teal-dark border-teal/30 font-medium">
                   <Network className="h-4 w-4 mr-2" />
                   {t('join_revolution')}
                </Badge>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{t('readyTitle')}</h2>
                <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                  {t('readySubtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-primary hover:shadow-elegant text-lg px-8 font-medium"
                    onClick={() => window.location.href = '/investments'}
                  >
                    <Target className="h-5 w-5 mr-2" />
                    {t('viewInvestments')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-sage-green text-sage-green hover:bg-sage-green/10 text-lg px-8 font-medium"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    <Users className="h-5 w-5 mr-2" />
                    {t('learnMore')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-foreground">{t('title')}</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                {t('footer_description')}
              </p>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  Discord
                </Button>
                <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  GitHub
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-foreground font-semibold mb-4">{t('platform')}</h4>
              <div className="space-y-3 text-sm">
                <a href="/investments" className="text-muted-foreground hover:text-foreground block transition-colors">
                  {t('browse_opportunities')}
                </a>
                <a href="/dashboard" className="text-muted-foreground hover:text-foreground block transition-colors">
                  {t('dashboard')}
                </a>
                <a href="/profile/apply" className="text-muted-foreground hover:text-foreground block transition-colors">
                  {t('apply_funding')}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-foreground font-semibold mb-4">{t('support')}</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">
                  {t('help_center')}
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">
                  {t('contact_us')}
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground block transition-colors">
                  {t('privacy_policy')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2024 {t('title')}. {t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
