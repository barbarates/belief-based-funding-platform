
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSolanaWallet } from '@/hooks/useSolanaWallet'
import { Wallet, Power, ExternalLink, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export const SolanaWalletConnection: React.FC = () => {
  const { 
    wallet, 
    loading, 
    connect, 
    disconnect, 
    refreshBalance, 
    isPhantomInstalled 
  } = useSolanaWallet()

  const handleConnect = async () => {
    if (!isPhantomInstalled) {
      toast.error('Phantom Wallet não encontrada', {
        description: 'Instale a Phantom Wallet para continuar',
        action: {
          label: 'Instalar',
          onClick: () => window.open('https://phantom.app/', '_blank')
        }
      })
      return
    }

    try {
      await connect()
      toast.success('Wallet conectada com sucesso!')
    } catch (error) {
      toast.error('Erro ao conectar wallet')
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      toast.success('Wallet desconectada')
    } catch (error) {
      toast.error('Erro ao desconectar wallet')
    }
  }

  if (!wallet.connected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Conectar Solana Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            Conecte sua wallet Phantom para investir na blockchain Solana
          </div>
          
          <Button 
            onClick={handleConnect}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wallet className="h-4 w-4 mr-2" />
            )}
            {isPhantomInstalled ? 'Conectar Phantom' : 'Instalar Phantom'}
          </Button>

          {!isPhantomInstalled && (
            <div className="text-xs text-gray-500 text-center">
              <ExternalLink className="h-3 w-3 inline mr-1" />
              Phantom é necessária para usar Solana
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-500" />
            Wallet Conectada
          </div>
          <Badge variant="default" className="bg-green-100 text-green-800">
            Solana
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Endereço:</div>
          <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
            {wallet.publicKey?.toString()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Saldo:</div>
            <div className="text-lg font-bold text-green-600">
              {wallet.balance.toFixed(4)} SOL
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshBalance}
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDisconnect}
            className="flex-1"
          >
            <Power className="h-4 w-4 mr-2" />
            Desconectar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://explorer.solana.com/address/${wallet.publicKey?.toString()}?cluster=devnet`, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
