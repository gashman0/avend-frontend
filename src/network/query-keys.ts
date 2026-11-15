const queryKeys = {
    users: {
        getUsers: ['users', 'getUsers'] as const,
        getMe: ['me', 'getMe'] as const,
        getDashboard: ['dashboard', 'getDashboard'] as const,
    },
}

export default queryKeys;