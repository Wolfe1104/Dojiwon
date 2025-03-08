// 1. Project ID
const projectId = 'd708272626c65a90e5261aa6006da4c1';

// 2. Metadata
const metadata = {
    name: 'Doji',
    description: 'AppKit Example',
    url: 'https://wolfe1104.github.io/Dojiwon/', // Updated to your GitHub Pages URL
    icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// 3. Networks
const networks = [
    ReownAppKit.networks.mainnet,
    ReownAppKit.networks.arbitrum
];

// 4. Custom Ethers Adapter (since no direct CDN for @reown/appkit-adapter-ethers)
const ethersAdapter = {
    name: 'EthersAdapter',
    provider: null,
    connect: async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            ethersAdapter.provider = provider;
            return provider;
        }
        throw new Error('No Ethereum provider found (e.g., MetaMask)');
    }
};

// 5. Create AppKit instance
const modal = ReownAppKit.createAppKit({
    adapters: [ethersAdapter],
    networks: networks,
    metadata: metadata,
    projectId: projectId,
    features: { analytics: true }
});

// Optional: Event listeners for debugging
modal.on('connect', (event) => {
    console.log('Connected:', event);
    alert('Wallet connected!');
});
modal.on('disconnect', () => {
    console.log('Disconnected');
    alert('Wallet disconnected');
});
