const queryKeys = {
    users: {
        getUsers: ['users', 'getUsers'] as const,
        getMe: ['me', 'getMe'] as const,
        getDashboard: ['dashboard', 'getDashboard'] as const,
        getWallet: ['wallet', 'getWallet'] as const,
        getInvestmentPlans: ['investmentPlans', 'getInvestMentPlans'] as const,
        getUserInvestments: ['userInvestments', 'getUserInvestments'] as const,
        getUserTransactions: ['userTransactions', 'getUserTransactions'] as const,
    },
}

export default queryKeys;