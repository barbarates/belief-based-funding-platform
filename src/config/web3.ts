
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'PeopleFi',
  projectId: 'YOUR_PROJECT_ID', // Você vai pegar isso no WalletConnect Cloud
  chains: [mainnet, polygon, polygonMumbai],
  ssr: false,
})
