import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// 1. Get projectId from https://cloud.reown.com
const projectId = 'd708272626c65a90e5261aa6006da4c1'

// 2. Create your application's metadata object
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://wolfe1104.github.io/Dojiwon/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})
// Trigger modal programaticaly
// Add this code inside `main.js` file at the end of the code file
const openConnectModalBtn = document.getElementById('open-connect-modal')
const openNetworkModalBtn = document.getElementById('open-network-modal')

openConnectModalBtn.addEventListener('click', () => modal.open())
openNetworkModalBtn.addEventListener('click', () => modal.open({ view: 'Networks' }))
