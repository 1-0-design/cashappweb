// Grid data for each tab
const gridData = {
    money: [
        { 
            title: 'Direct Deposit',
            label: 'Get Paid Early',
            description: 'Get your paycheck up to two days early with direct deposit. Just share your Cash App routing and account numbers with your employer and get paid sooner, with no hidden fees or hassle.'
        },
        { 
            title: 'Cash Card',
            label: 'Spend',
            description: 'A free, customizable debit card that works everywhere Visa is accepted. Design your own card, add it to Apple Pay or Google Pay, and get instant discounts at your favorite spots with Cash App Boosts.'
        },
        { 
            title: 'Banking',
            label: 'Mobile Bank',
            description: 'A full-featured mobile bank account without the paperwork. Send and receive money instantly, use your free debit card everywhere, and manage your money with powerful tools built right in.'
        },
        { 
            title: 'Payments',
            label: 'Send & Receive',
            description: 'Send and receive money instantly with anyone in the US. No forms to fill out, no bank details needed - just enter an amount, pick a $cashtag, and tap send.'
        },
        { 
            title: 'Bitcoin',
            label: 'Buy & Sell',
            description: 'Buy, sell, and send Bitcoin without the wait. Start with as little as $1 and trade instantly, 24/7. Your Bitcoin is kept secure in our vault system with state-of-the-art encryption.'
        },
        { 
            title: 'Stocks',
            label: 'Invest',
            description: 'Invest in stocks with as little as $1. Buy fractional shares of your favorite companies instantly, with no commission fees. Track your portfolio in real-time and learn as you grow.'
        },
        { 
            title: 'Money Tools',
            label: 'Manage',
            description: 'Take control of your money with powerful tools built right into Cash App. Set spending limits, track your activity, automate your savings, and get detailed financial insights.'
        },
        { 
            title: 'Round Ups',
            label: 'Save',
            description: 'Turn everyday purchases into investments automatically. Round up every transaction to the nearest dollar and invest the difference in stocks or Bitcoin. Small change, big potential.'
        }
    ],
    'send-money': [
        { title: 'Instant Transfer', label: 'Send Instantly' },
        { title: 'QR Code', label: 'Scan & Pay' },
        { title: 'Request', label: 'Get Paid' },
        { title: 'Group Pay', label: 'Split Bills' },
        { title: 'Cash Tags', label: '$Cashtag' },
        { title: 'Cross Border', label: 'International' },
        { title: 'Paper Money', label: 'Cash Out' },
        { title: 'Business', label: 'For Work' }
    ],
    card: [
        { title: 'Custom Design', label: 'Personalize' },
        { title: 'Contactless', label: 'Tap to Pay' },
        { title: 'Boosts', label: 'Save Money' },
        { title: 'Virtual Card', label: 'Shop Online' },
        { title: 'ATM', label: 'Withdraw' },
        { title: 'Security', label: 'Lock Card' },
        { title: 'Pin', label: 'Set Up' },
        { title: 'Limits', label: 'Spending' }
    ],
    local: [
        { title: 'Cash Map', label: 'Near You' },
        { title: 'Boost Spots', label: 'Discounts' },
        { title: 'Bitcoin ATMs', label: 'Buy BTC' },
        { title: 'ATM Finder', label: 'Get Cash' },
        { title: 'Community', label: 'Local Events' },
        { title: 'Coffee', label: 'Cafe Deals' },
        { title: 'Partners', label: 'Local Shops' },
        { title: 'Favorites', label: 'Save Places' }
    ],
    account: [
        { title: 'Profile', label: 'Settings' },
        { title: 'Security', label: 'Privacy' },
        { title: 'Statements', label: 'History' },
        { title: 'Support', label: 'Help' },
        { title: 'Rewards', label: 'Earn' },
        { title: 'Notifications', label: 'Alerts' },
        { title: 'Family', label: 'Accounts' },
        { title: 'Documents', label: 'Tax Forms' }
    ]
};

// Tab order for navigation
const tabOrder = ['money', 'card', 'send-money', 'local', 'account'];

// Current active tab
let currentTab = 'money';