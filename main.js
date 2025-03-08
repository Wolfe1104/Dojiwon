// 1. Project ID
const projectId = 'd708272626c65a90e5261aa6006da4c1';

// 2. Networks
const networks = [
    ReownAppKit.networks.mainnet,
    ReownAppKit.networks.arbitrum
];

// 3. Metadata
const metadata = {
    name: 'Doji',
    description: 'AppKit Example',
    url: 'https://wolfe1104.github.io/Dojiwon/index.html',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// 4. Custom Wagmi Adapter (since no direct CDN for @reown/appkit-adapter-wagmi)
const wagmiAdapter = {
    name: 'WagmiAdapter',
    provider: null,
    connect: async () => {
        if (window.ethereum) {
            const provider = window.ethereum;
            await provider.request({ method: 'eth_requestAccounts' });
            wagmiAdapter.provider = provider;
            return provider;
        }
        throw new Error('No Ethereum provider found (e.g., MetaMask)');
    },
    switchNetwork: async (networkId) => {
        if (!wagmiAdapter.provider) throw new Error('Not connected');
        await wagmiAdapter.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(networkId).toString(16)}` }]
        });
    }
};

// 5. Create the modal
const modal = ReownAppKit.createAppKit({
    adapters: [wagmiAdapter],
    networks: networks,
    metadata: metadata,
    projectId: projectId,
    features: { analytics: true }
});

// 6. Button event listeners
const openConnectModalBtn = document.getElementById('open-connect-modal');
const openNetworkModalBtn = document.getElementById('open-network-modal');

openConnectModalBtn.addEventListener('click', () => {
    modal.open();
});

openNetworkModalBtn.addEventListener('click', () => {
    modal.open({ view: 'Networks' });
});

// 7. Event listeners for connection status
modal.on('connect', (event) => {
    console.log('Connected:', event);
    alert('Wallet connected!');
});
modal.on('disconnect', () => {
    console.log('Disconnected');
    alert('Wallet disconnected');
});
