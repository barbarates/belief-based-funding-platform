
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useWeb3Auth } from './useWeb3Auth'

export interface KYCVerification {
  id: string
  user_id: string
  verification_level: 'none' | 'basic' | 'advanced' | 'institutional'
  document_type: string | null
  document_number: string | null
  document_country: string | null
  verification_provider: string | null
  verification_id: string | null
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  verified_at: string | null
  expires_at: string | null
  rejection_reason: string | null
  metadata: any
  created_at: string
  updated_at: string
}

export const useKYC = () => {
  const { user, isConnected } = useWeb3Auth()
  const [kycStatus, setKycStatus] = useState<KYCVerification | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected || !user) {
      setLoading(false)
      return
    }

    const fetchKycStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('kyc_verifications')
          .select('*')
          .eq('user_id', user.address)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Erro ao buscar KYC:', error)
          setError('Erro ao carregar status KYC')
          return
        }

        setKycStatus(data)
      } catch (err) {
        console.error('Erro geral:', err)
        setError('Erro inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchKycStatus()
  }, [isConnected, user])

  const submitKYC = async (kycData: {
    verification_level: string
    document_type: string
    document_number: string
    document_country: string
  }) => {
    if (!user) return { error: 'Usuário não conectado' }

    try {
      const { data, error } = await supabase
        .from('kyc_verifications')
        .upsert({
          user_id: user.address,
          ...kycData,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error('Erro ao enviar KYC:', error)
        return { error: 'Erro ao enviar KYC' }
      }

      setKycStatus(data)
      return { data }
    } catch (err) {
      console.error('Erro ao enviar KYC:', err)
      return { error: 'Erro inesperado' }
    }
  }

  const isKYCApproved = kycStatus?.status === 'approved'
  const needsKYC = !kycStatus || kycStatus.status === 'none'

  return {
    kycStatus,
    loading,
    error,
    submitKYC,
    isKYCApproved,
    needsKYC
  }
}
