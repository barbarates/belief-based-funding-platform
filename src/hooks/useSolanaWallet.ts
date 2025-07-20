
import { useState, useEffect } from 'react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createConnection } from '@/config/solana'

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect(): Promise<{ publicKey: PublicKey }>
      disconnect(): Promise<void>
      on(event: string, callback: Function): void
      request(method: string, params?: any): Promise<any>
    }
  }
}

export const useSolanaWallet = () => {
  const [wallet, setWallet] = useState<{
    publicKey: PublicKey | null
    connected: boolean
    balance: number
  }>({
    publicKey: null,
    connected: false,
    balance: 0
  })
  
  const [loading, setLoading] = useState(false)
  const [connection] = useState(() => createConnection())

  useEffect(() => {
    const checkWallet = async () => {
      if (window.solana?.isPhantom) {
        try {
          const response = await window.solana.connect()
          setWallet(prev => ({
            ...prev,
            publicKey: response.publicKey,
            connected: true
          }))
          
          // Buscar saldo
          const balance = await connection.getBalance(response.publicKey)
          setWallet(prev => ({
            ...prev,
            balance: balance / LAMPORTS_PER_SOL
          }))
        } catch (error) {
          console.log('Wallet não conectada automaticamente')
        }
      }
    }

    checkWallet()

    // Listener para mudanças na wallet
    if (window.solana) {
      window.solana.on('connect', (publicKey: PublicKey) => {
        setWallet(prev => ({ ...prev, publicKey, connected: true }))
      })

      window.solana.on('disconnect', () => {
        setWallet({ publicKey: null, connected: false, balance: 0 })
      })
    }
  }, [connection])

  const connect = async () => {
    if (!window.solana) {
      window.open('https://phantom.app/', '_blank')
      return
    }

    setLoading(true)
    try {
      const response = await window.solana.connect()
      setWallet(prev => ({
        ...prev,
        publicKey: response.publicKey,
        connected: true
      }))

      // Buscar saldo
      const balance = await connection.getBalance(response.publicKey)
      setWallet(prev => ({
        ...prev,
        balance: balance / LAMPORTS_PER_SOL
      }))
    } catch (error) {
      console.error('Erro ao conectar wallet:', error)
    } finally {
      setLoading(false)
    }
  }

  const disconnect = async () => {
    if (window.solana) {
      await window.solana.disconnect()
      setWallet({ publicKey: null, connected: false, balance: 0 })
    }
  }

  const refreshBalance = async () => {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey)
      setWallet(prev => ({
        ...prev,
        balance: balance / LAMPORTS_PER_SOL
      }))
    }
  }

  return {
    wallet,
    loading,
    connect,
    disconnect,
    refreshBalance,
    connection,
    isPhantomInstalled: !!window.solana?.isPhantom
  }
}
