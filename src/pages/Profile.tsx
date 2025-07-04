
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Star, Users, DollarSign, MapPin, Calendar, Globe, Linkedin, Twitter } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'
import { useCampaigns } from '@/hooks/useCampaigns'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { profile, loading: profileLoading, error: profileError } = useProfile(id)
  const { campaigns, loading: campaignsLoading } = useCampaigns(id)

  const loading = profileLoading || campaignsLoading

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando perfil...</div>
      </div>
    )
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">{profileError || 'Perfil não encontrado'}</div>
          <Button onClick={() => navigate('/investments')} className="bg-white text-purple-900 hover:bg-gray-100">
            Voltar para Investimentos
          </Button>
        </div>
      </div>
    )
  }

  const totalRaised = campaigns.reduce((sum, campaign) => sum + (campaign.raised_amount || 0), 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length

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
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white font-bold">
                  {profile.full_name?.charAt(0) || profile.username?.charAt(0) || '?'}
                </div>
                <CardTitle className="text-white text-2xl">
                  {profile.full_name || profile.username || 'Usuário'}
                </CardTitle>
                {profile.username && profile.full_name && (
                  <div className="text-gray-300">@{profile.username}</div>
                )}
                {profile.category && (
                  <Badge className="bg-purple-600/50 text-purple-200 mt-2">
                    {profile.category}
                  </Badge>
                )}
                {profile.verified && (
                  <Badge className="bg-green-600/50 text-green-200 mt-2">
                    ✓ Verificado
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-green-400 font-bold text-lg">
                      ${totalRaised.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Total Arrecadado</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold text-lg">
                      {activeCampaigns}
                    </div>
                    <div className="text-gray-400 text-sm">Campanhas Ativas</div>
                  </div>
                </div>

                {/* Links sociais */}
                <div className="flex gap-2 justify-center">
                  {profile.website && (
                    <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white">
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {profile.linkedin_url && (
                    <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white">
                      <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {profile.twitter_handle && (
                    <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white">
                      <a href={`https://twitter.com/${profile.twitter_handle}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Investir Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {profile.bio && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Sobre</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Campanhas ({campaigns.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {campaigns.length > 0 ? (
                  <div className="grid gap-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="bg-black/20 rounded-lg p-4 cursor-pointer hover:bg-black/30 transition-colors"
                           onClick={() => navigate(`/invest/${campaign.id}`)}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-semibold">{campaign.title}</h3>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status === 'active' ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </div>
                        {campaign.description && (
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{campaign.description}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-300">
                            Meta: ${campaign.goal_amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-400">
                            Arrecadado: ${(campaign.raised_amount || 0).toLocaleString()}
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ 
                              width: `${Math.min(((campaign.raised_amount || 0) / campaign.goal_amount) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma campanha encontrada</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
