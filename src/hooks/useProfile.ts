
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Profile {
  id: string
  full_name: string | null
  username: string | null
  bio: string | null
  category: string | null
  avatar_url: string | null
  website: string | null
  twitter_handle: string | null
  linkedin_url: string | null
  verified: boolean | null
  created_at: string
  updated_at: string
}

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) {
          console.error('Erro ao buscar perfil:', error)
          setError('Perfil não encontrado')
          return
        }

        setProfile(data)
      } catch (err) {
        console.error('Erro geral:', err)
        setError('Erro ao carregar perfil')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!userId) return { error: 'ID do usuário não fornecido' }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar perfil:', error)
        return { error: 'Erro ao atualizar perfil' }
      }

      setProfile(data)
      return { data }
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err)
      return { error: 'Erro inesperado' }
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile
  }
}
