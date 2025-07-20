
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Users, DollarSign, Star, Clock, CheckCircle, Wallet, Globe, ArrowRight, Zap, Target, Award, ChevronDown } from "lucide-react";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const { isConnected, connectWallet, address } = useWeb3Auth();
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
      icon: <Shield className="h-8 w-8" />,
      title: t('smart_contract_escrow'),
      description: t('smart_contract_description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: t('milestone_based_release'),
      description: t('milestone_description'),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('community_verification'), 
      description: t('community_description'),
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('performance_tracking'),
      description: t('performance_description'),
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: t('total_invested'), value: "$2.4M", growth: "+127%" },
    { label: t('active_investors'), value: "1,247", growth: "+89%" },
    { label: t('success_rate'), value: "94.2%", growth: "+12%" },
    { label: t('avg_return'), value: "23.5%", growth: "+8%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('title')}
                </h1>
              </div>
              
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <a href="#opportunities" className="text-gray-300 hover:text-white transition-colors">
                  {t('opportunities')}
                </a>
                <a href="#safety" className="text-gray-300 hover:text-white transition-colors">
                  {t('safety')}
                </a>
                <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  {t('dashboard')}
                </a>
                <a href="/solana-test" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                  🚀 Testar Solana
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <select 
                  value={language} 
                  onChange={(e) => changeLanguage(e.target.value as any)}
                  className="bg-slate-800/50 backdrop-blur-sm text-white border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                >
                  <option value="en">🇺🇸 EN</option>
                  <option value="pt">🇧🇷 PT</option>
                  <option value="es">🇪🇸 ES</option>
                </select>
              </div>

              {/* Wallet Connection */}
              <Button 
                onClick={isConnected ? () => window.location.href = '/dashboard' : connectWallet}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : t('connectWallet')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Star className="h-4 w-4 mr-2" />
              {t('platform_badge')}
            </Badge>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {t('hero_title')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/25 text-lg px-8 py-4"
                onClick={() => window.location.href = '/investments'}
              >
                <Target className="h-5 w-5 mr-2" />
                {t('startInvesting')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 backdrop-blur-sm text-lg px-8 py-4"
                onClick={() => window.location.href = '/profile/apply'}
              >
                <Award className="h-5 w-5 mr-2" />
                {t('apply_funding')}
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      {stat.growth}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section id="safety" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Shield className="h-4 w-4 mr-2" />
              {t('security_first')}
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">{t('safetyBuiltTitle')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('safety_description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, idx) => (
              <Card key={idx} className="group bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-3 text-lg">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments - IMPROVED LAYOUT */}
      <section id="opportunities" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <TrendingUp className="h-4 w-4 mr-2" />
              {t('trending_now')}
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">{t('featuredTitle')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('featured_description')}
            </p>
          </div>
          
          {/* Compact Investment Cards */}
          <div className="space-y-6">
            {featuredPeople.map((person) => (
              <Card key={person.id} className="group bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-slate-600 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Profile Info */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <span className="text-5xl">{person.image}</span>
                          {person.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{person.name}</h3>
                          <Badge variant="secondary" className="bg-purple-600/30 text-purple-300">
                            {person.category}
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-400 ml-2">
                            {person.growth}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4 max-w-md">{person.description}</p>
                    </div>

                    {/* Center: Progress & Stats */}
                    <div className="flex-grow">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Progress Bar */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{t('progress')}</span>
                            <span className="text-white font-medium">
                              ${person.raised.toLocaleString()} / ${person.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={(person.raised / person.goal) * 100} className="h-3" />
                          
                          {/* Quick Stats */}
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                              <div className="text-purple-300 font-bold text-lg">{person.backers}</div>
                              <div className="text-gray-500 text-xs">{t('backers')}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-yellow-400 font-bold text-lg flex items-center justify-center gap-1">
                                <Star className="h-4 w-4" />
                                {person.rating}
                              </div>
                              <div className="text-gray-500 text-xs">{t('rating')}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-green-400 font-bold text-lg">{person.estimatedReturn}</div>
                              <div className="text-gray-500 text-xs">{t('expected_return')}</div>
                            </div>
                          </div>
                        </div>

                        {/* Milestones & Timeline */}
                        <div className="bg-slate-900/50 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {t('timeframe')}:
                            </span>
                            <span className="text-blue-400 font-medium">{person.timeframe}</span>
                          </div>
                          
                          <div>
                            <div className="text-gray-400 text-sm mb-2">{t('next_milestones')}:</div>
                            <div className="space-y-1">
                              {person.milestones.slice(0, 3).map((milestone, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                  {milestone}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="flex-shrink-0 flex items-center">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 px-8"
                        onClick={() => window.location.href = `/invest/${person.id}`}
                      >
                        <DollarSign className="h-5 w-5 mr-2" />
                        {t('invest_now')}
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
              className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 backdrop-blur-sm"
              onClick={() => window.location.href = '/investments'}
            >
              {t('view_all_opportunities')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border-slate-600/50 shadow-2xl">
            <CardContent className="text-center py-16">
              <div className="max-w-3xl mx-auto">
                <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                  <Zap className="h-4 w-4 mr-2" />
                  {t('join_revolution')}
                </Badge>
                
                <h2 className="text-4xl font-bold text-white mb-6">{t('readyTitle')}</h2>
                <p className="text-gray-300 mb-10 text-lg leading-relaxed">
                  {t('readySubtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-slate-900 hover:bg-gray-100 shadow-xl text-lg px-8"
                    onClick={() => window.location.href = '/investments'}
                  >
                    <Target className="h-5 w-5 mr-2" />
                    {t('viewInvestments')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8"
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
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('title')}</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                {t('footer_description')}
              </p>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="border-slate-700 text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="border-slate-700 text-gray-400 hover:text-white">
                  Discord
                </Button>
                <Button size="sm" variant="outline" className="border-slate-700 text-gray-400 hover:text-white">
                  GitHub
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t('platform')}</h4>
              <div className="space-y-2 text-sm">
                <a href="/investments" className="text-gray-400 hover:text-white block transition-colors">
                  {t('browse_opportunities')}
                </a>
                <a href="/dashboard" className="text-gray-400 hover:text-white block transition-colors">
                  {t('dashboard')}
                </a>
                <a href="/profile/apply" className="text-gray-400 hover:text-white block transition-colors">
                  {t('apply_funding')}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t('support')}</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  {t('help_center')}
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  {t('contact_us')}
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  {t('privacy_policy')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 {t('title')}. {t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
