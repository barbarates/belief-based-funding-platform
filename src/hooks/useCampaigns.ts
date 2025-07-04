
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Campaign {
  id: string
  creator_id: string
  title: string
  description: string | null
  goal_amount: number
  raised_amount: number | null
  category: string | null
  status: string | null
  timeframe: string | null
  image_url: string | null
  estimated_return_min: number | null
  estimated_return_max: number | null
  created_at: string
  updated_at: string
}

export const useCampaigns = (creatorId?: string) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        let query = supabase
          .from('investment_campaigns')
          .select('*')
          .order('created_at', { ascending: false })

        if (creatorId) {
          query = query.eq('creator_id', creatorId)
        }

        const { data, error } = await query

        if (error) {
          console.error('Erro ao buscar campanhas:', error)
          setError('Erro ao carregar campanhas')
          return
        }

        setCampaigns(data || [])
      } catch (err) {
        console.error('Erro geral:', err)
        setError('Erro inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [creatorId])

  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('investment_campaigns')
        .insert([campaignData])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar campanha:', error)
        return { error: 'Erro ao criar campanha' }
      }

      setCampaigns(prev => [data, ...prev])
      return { data }
    } catch (err) {
      console.error('Erro ao criar campanha:', err)
      return { error: 'Erro inesperado' }
    }
  }

  return {
    campaigns,
    loading,
    error,
    createCampaign
  }
}
