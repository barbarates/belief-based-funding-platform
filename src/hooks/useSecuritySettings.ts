import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useProfile } from './useProfile'

export const useSecuritySettings = (campaignId?: string) => {
  const { profile } = useProfile()
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.id) {
      fetchSecuritySettings()
    }
  }, [profile?.id])

  const fetchSecuritySettings = async () => {
    try {
      const { data, error } = await supabase
        .from('security_settings')
        .select('*')
        .eq('user_id', profile?.id)
        .single()

      if (data) {
        setSettings({
          ...data,
          min_investment_amount: 100,
          max_investment_amount: 10000,
          kyc_required: true,
          voting_threshold_percentage: 60,
          milestone_approval_deadline_hours: 72,
          emergency_pause_enabled: true,
          whitelist_only: false
        })
      } else {
        // Default settings
        setSettings({
          min_investment_amount: 100,
          max_investment_amount: 10000,
          kyc_required: false,
          voting_threshold_percentage: 50,
          milestone_approval_deadline_hours: 48,
          emergency_pause_enabled: false,
          whitelist_only: false
        })
      }
    } catch (error) {
      console.error('Error fetching security settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateInvestment = async (amount: number, address: string) => {
    // Mock validation - in real app would call backend
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (amount < (settings?.min_investment_amount || 100)) {
      return {
        isValid: false,
        errorMessage: `Minimum investment: $${settings?.min_investment_amount || 100}`
      }
    }
    
    if (amount > (settings?.max_investment_amount || 10000)) {
      return {
        isValid: false,
        errorMessage: `Maximum investment: $${settings?.max_investment_amount || 10000}`
      }
    }

    return { isValid: true }
  }

  return {
    settings,
    loading,
    validateInvestment,
    refetch: fetchSecuritySettings
  }
}