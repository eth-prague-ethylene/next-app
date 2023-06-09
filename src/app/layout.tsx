'use client'

import LabelBottomNavigation from './components/BottomNavigation'
import Header from './components/Header'
import './globals.css'
import './styles/BottomNavigation.css'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { LensProvider, LensConfig, production, appId } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import { constants } from '@/constants'
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()])

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  appId: appId(constants.LENS_APP_ID),
  environment: production,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://lens.xyz/widget-styles.css" />
        <script async src="https://lens.xyz/widget.js"></script>
      </head>
      <body>

        <WagmiConfig client={client}>
          <LensProvider config={lensConfig}>
            <Header />
            {children}
            <LabelBottomNavigation />
          </LensProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
