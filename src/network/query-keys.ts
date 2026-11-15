const queryKeys = {
    users: {
        getUsers: ['users', 'getUsers'] as const,
        getMe: ['me', 'getMe'] as const,
        getDashboard: ['dashboard', 'getDashboard'] as const,
        getWallet: ['wallet', 'getWallet'] as const,
    },
}

export default queryKeys;