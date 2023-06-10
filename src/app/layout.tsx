'use client'

import LabelBottomNavigation from './components/BottomNavigation'
import Header from './components/Header'
import './globals.css'
import './styles/BottomNavigation.css'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { LensProvider, LensConfig, appId, development, sources } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'

const { provider, webSocketProvider } = configureChains([polygonMumbai], [publicProvider()])

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
  appId: appId('ethylene'),
  sources: [sources.lenster, appId('ethylene')]
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
