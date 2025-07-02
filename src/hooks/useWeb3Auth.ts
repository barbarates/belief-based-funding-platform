
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useEffect, useState } from 'react'

export const useWeb3Auth = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address: address,
  })
  
  const [user, setUser] = useState<{
    address: string
    balance: string
    isInvestor: boolean
  } | null>(null)

  useEffect(() => {
    if (isConnected && address) {
      setUser({
        address,
        balance: balance?.formatted || '0',
        isInvestor: true // Por enquanto todos são investidores
      })
    } else {
      setUser(null)
    }
  }, [isConnected, address, balance])

  const connectWallet = () => {
    const injectedConnector = connectors.find(c => c.id === 'injected')
    if (injectedConnector) {
      connect({ connector: injectedConnector })
    }
  }

  return {
    user,
    isConnected,
    connectWallet,
    disconnect,
    address,
    balance: balance?.formatted || '0'
  }
}
