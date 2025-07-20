import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useProfile } from './useProfile'

export const useKYC = () => {
  const { profile } = useProfile()
  const [kycData, setKycData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isKYCApproved, setIsKYCApproved] = useState(false)
  const [needsKYC, setNeedsKYC] = useState(false)

  useEffect(() => {
    if (profile?.id) {
      fetchKYCStatus()
    }
  }, [profile?.id])

  const fetchKYCStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('kyc_verifications')
        .select('*')
        .eq('user_id', profile?.id)
        .single()

      if (data) {
        setKycData(data)
        setIsKYCApproved(data.status === 'approved')
        setNeedsKYC(data.status === 'pending' || data.status === 'rejected')
      } else {
        setNeedsKYC(true)
      }
    } catch (error) {
      console.error('Error fetching KYC status:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitKYC = async (kycInfo: any) => {
    try {
      const { error } = await supabase
        .from('kyc_verifications')
        .insert({
          user_id: profile?.id,
          ...kycInfo
        })

      if (!error) {
        await fetchKYCStatus()
        return { success: true }
      }
      return { success: false, error }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    kycData,
    loading,
    isKYCApproved,
    needsKYC,
    submitKYC,
    refetch: fetchKYCStatus
  }
}