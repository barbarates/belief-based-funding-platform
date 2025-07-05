
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface SecuritySettings {
  id: string
  campaign_id: string
  min_investment_amount: number
  max_investment_amount: number
  voting_threshold_percentage: number
  milestone_approval_deadline_hours: number
  emergency_pause_enabled: boolean
  kyc_required: boolean
  whitelist_only: boolean
  created_at: string
  updated_at: string
}

export const useSecuritySettings = (campaignId: string) => {
  const [settings, setSettings] = useState<SecuritySettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('security_settings')
          .select('*')
          .eq('campaign_id', campaignId)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Erro ao buscar configurações:', error)
          setError('Erro ao carregar configurações de segurança')
          return
        }

        setSettings(data)
      } catch (err) {
        console.error('Erro geral:', err)
        setError('Erro inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [campaignId])

  const updateSettings = async (updates: Partial<SecuritySettings>) => {
    try {
      const { data, error } = await supabase
        .from('security_settings')
        .upsert({
          campaign_id: campaignId,
          ...updates
        })
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar configurações:', error)
        return { error: 'Erro ao atualizar configurações' }
      }

      setSettings(data)
      return { data }
    } catch (err) {
      console.error('Erro ao atualizar configurações:', err)
      return { error: 'Erro inesperado' }
    }
  }

  const validateInvestment = async (amount: number, investorId: string) => {
    try {
      const { data, error } = await supabase.rpc('validate_investment_security', {
        p_campaign_id: campaignId,
        p_investor_id: investorId,
        p_amount: amount
      })

      if (error) {
        console.error('Erro na validação:', error)
        return { isValid: false, errorMessage: 'Erro na validação de segurança' }
      }

      return data[0] || { isValid: false, errorMessage: 'Erro desconhecido' }
    } catch (err) {
      console.error('Erro na validação:', err)
      return { isValid: false, errorMessage: 'Erro inesperado' }
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings,
    validateInvestment
  }
}
