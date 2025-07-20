import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useProfile } from '@/hooks/useProfile'
import { useCampaigns } from '@/hooks/useCampaigns'
import { ContractInterface } from '@/components/Web3/ContractInterface'
import { formatAmount } from '@/contracts/PeopleFiSmartContract'


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const InvestmentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { profile, loading: profileLoading } = useProfile()
  const { campaigns, loading: campaignsLoading } = useCampaigns()
  const [campaign, setCampaign] = useState(null)

  useEffect(() => {
    if (id && campaigns && campaigns.length > 0) {
      const foundCampaign = campaigns.find((campaign) => campaign.id === id)
      setCampaign(foundCampaign)
    }
  }, [id, campaigns])

  if (campaignsLoading || profileLoading) {
    return <div>Carregando...</div>
  }

  if (!campaign) {
    return <div>Campanha não encontrada</div>
  }

  const handleBack = () => {
    navigate('/investments')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack}>Voltar</Button>
          <h1 className="text-lg font-semibold">Detalhes da Campanha</h1>
          <div></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage src={campaign.image_url} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.category}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{campaign.description}</p>
            <div className="mt-4">
              <p className="text-sm font-medium">Meta: {formatAmount(BigInt(campaign.goal_amount))}</p>
              <Progress value={(campaign.raised_amount / campaign.goal_amount) * 100} />
              <p className="text-sm mt-2">Arrecadado: {formatAmount(BigInt(campaign.raised_amount || 0))}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="milestones">Marcos</TabsTrigger>
            <TabsTrigger value="invest">Investir</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Campanha</CardTitle>
                <CardDescription>Informações detalhadas sobre a campanha.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{campaign.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Marcos da Campanha</CardTitle>
                <CardDescription>Acompanhe o progresso da campanha.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Em breve: Lista de marcos e progresso detalhado.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invest" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContractInterface 
                  campaignId={id!} 
                  isCreator={false}
                />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas de Investimento</CardTitle>
                    <CardDescription>Veja como está a campanha.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Investidores: 150</p>
                    <p>Retorno Estimado: 10-15%</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Dashboard de Segurança</h3>
                  <p className="text-muted-foreground">
                    Funcionalidades de segurança em desenvolvimento
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default InvestmentDetail
