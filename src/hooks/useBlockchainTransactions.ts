import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface BlockchainTransaction {
  id: string
  campaign_id: string | null
  investor_id: string | null
  transaction_hash: string
  transaction_type: string
  amount: number
  network_id: string
  block_number: number | null
  gas_used: number | null
  gas_price: number | null
  status: string
  created_at: string
  confirmed_at: string | null
}

export const useBlockchainTransactions = () => {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('blockchain_transactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTransactions(data as BlockchainTransaction[] || [])
    } catch (error) {
      console.error('Erro ao buscar transações blockchain:', error)
    } finally {
      setLoading(false)
    }
  }

  const recordTransaction = async (transaction: {
    campaign_id: string
    investor_id: string
    transaction_hash: string
    transaction_type: string
    amount: number
    network_id: string
    status: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_transactions')
        .insert(transaction)
        .select()
        .single()

      if (error) throw error
      
      setTransactions(prev => [data as BlockchainTransaction, ...prev])
      return data as BlockchainTransaction
    } catch (error) {
      console.error('Erro ao registrar transação:', error)
      throw error
    }
  }

  const updateTransactionStatus = async (
    transactionHash: string, 
    status: string, 
    blockNumber?: number
  ) => {
    try {
      const { error } = await supabase
        .from('blockchain_transactions')
        .update({ 
          status, 
          block_number: blockNumber,
          confirmed_at: status === 'confirmed' ? new Date().toISOString() : null
        })
        .eq('transaction_hash', transactionHash)

      if (error) throw error
      
      setTransactions(prev => 
        prev.map(tx => 
          tx.transaction_hash === transactionHash 
            ? { 
                ...tx, 
                status, 
                block_number: blockNumber || tx.block_number,
                confirmed_at: status === 'confirmed' ? new Date().toISOString() : tx.confirmed_at
              }
            : tx
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar status da transação:', error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    fetchTransactions,
    recordTransaction,
    updateTransactionStatus
  }
}