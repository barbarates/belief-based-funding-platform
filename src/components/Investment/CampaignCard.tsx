
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Users, DollarSign, Clock } from "lucide-react"

interface Campaign {
  id: string
  name: string
  category: string
  description: string
  goal: number
  raised: number
  backers: number
  rating: number
  timeframe: string
  image: string
}

interface CampaignCardProps {
  campaign: Campaign
  onInvest: (campaignId: string) => void
}

export const CampaignCard = ({ campaign, onInvest }: CampaignCardProps) => {
  const progress = (campaign.raised / campaign.goal) * 100

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{campaign.image}</span>
          <div>
            <CardTitle className="text-white text-lg">{campaign.name}</CardTitle>
            <Badge variant="secondary" className="bg-purple-600/50 text-purple-200">
              {campaign.category}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-gray-300">
          {campaign.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Progresso</span>
            <span>${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-purple-300 font-semibold flex items-center justify-center gap-1">
              <Users className="h-4 w-4" />
              {campaign.backers}
            </div>
            <div className="text-gray-400">Investidores</div>
          </div>
          <div className="text-center">
            <div className="text-purple-300 font-semibold flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" />
              {campaign.rating}
            </div>
            <div className="text-gray-400">Avaliação</div>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Prazo:
            </span>
            <span className="text-blue-400">{campaign.timeframe}</span>
          </div>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={() => onInvest(campaign.id)}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Investir
        </Button>
      </CardContent>
    </Card>
  )
}
