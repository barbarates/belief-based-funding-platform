
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useWeb3Auth } from './useWeb3Auth'

export interface BlockchainTransaction {
  id: string
  campaign_id: string | null
  investor_id: string | null
  transaction_hash: string
  transaction_type: 'investment' | 'milestone_vote' | 'fund_release' | 'return_distribution'
  amount: number | null
  gas_used: number | null
  gas_price: number | null
  block_number: number | null
  network_id: number
  status: 'pending' | 'confirmed' | 'failed'
  created_at: string
  confirmed_at: string | null
}

export const useBlockchainTransactions = (campaignId?: string) => {
  const { user, isConnected } = useWeb3Auth()
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected) {
      setLoading(false)
      return
    }

    const fetchTransactions = async () => {
      try {
        let query = supabase
          .from('blockchain_transactions')
          .select('*')
          .order('created_at', { ascending: false })

        if (campaignId) {
          query = query.eq('campaign_id', campaignId)
        } else if (user) {
          query = query.eq('investor_id', user.address)
        }

        const { data, error } = await query

        if (error) {
          console.error('Erro ao buscar transações:', error)
          setError('Erro ao carregar transações')
          return
        }

        setTransactions(data || [])
      } catch (err) {
        console.error('Erro geral:', err)
        setError('Erro inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [isConnected, user, campaignId])

  const recordTransaction = async (transactionData: {
    campaign_id?: string
    transaction_hash: string
    transaction_type: BlockchainTransaction['transaction_type']
    amount?: number
    gas_used?: number
    gas_price?: number
    block_number?: number
  }) => {
    if (!user) return { error: 'Usuário não conectado' }

    try {
      const { data, error } = await supabase
        .from('blockchain_transactions')
        .insert({
          investor_id: user.address,
          network_id: 137, // Polygon
          status: 'pending',
          ...transactionData
        })
        .select()
        .single()

      if (error) {
        console.error('Erro ao registrar transação:', error)
        return { error: 'Erro ao registrar transação' }
      }

      setTransactions(prev => [data, ...prev])
      return { data }
    } catch (err) {
      console.error('Erro ao registrar transação:', err)
      return { error: 'Erro inesperado' }
    }
  }

  const updateTransactionStatus = async (
    transactionHash: string,
    status: BlockchainTransaction['status'],
    blockNumber?: number
  ) => {
    try {
      const updateData: any = { status }
      if (status === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString()
        if (blockNumber) updateData.block_number = blockNumber
      }

      const { data, error } = await supabase
        .from('blockchain_transactions')
        .update(updateData)
        .eq('transaction_hash', transactionHash)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar transação:', error)
        return { error: 'Erro ao atualizar transação' }
      }

      setTransactions(prev => 
        prev.map(tx => 
          tx.transaction_hash === transactionHash ? data : tx
        )
      )
      return { data }
    } catch (err) {
      console.error('Erro ao atualizar transação:', err)
      return { error: 'Erro inesperado' }
    }
  }

  return {
    transactions,
    loading,
    error,
    recordTransaction,
    updateTransactionStatus
  }
}
