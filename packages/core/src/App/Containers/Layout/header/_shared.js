const extend = require('extend');

export const isEmptyObject = obj => {
    let is_empty = true;
    if (obj && obj instanceof Object) {
        Object.keys(obj).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) is_empty = false;
        });
    }
    return is_empty;
};
export const cloneObject = obj => (!isEmptyObject(obj) ? extend(true, Array.isArray(obj) ? [] : {}, obj) : obj);
export const getPropertyValue = (obj, k) => {
    let keys = k;
    if (!Array.isArray(keys)) keys = [keys];
    if (!isEmptyObject(obj) && keys[0] in obj && keys && keys.length > 1) {
        return getPropertyValue(obj[keys[0]], keys.slice(1));
    }
    // else return clone of object to avoid overwriting data
    return obj ? cloneObject(obj[keys[0]]) : undefined;
};
export const isCryptocurrency = currency => {
    return /crypto/i.test(getPropertyValue(currencies_config, [currency, 'type'])) || currency;
};
export const calcDecimalPlaces = currency => {
    return isCryptocurrency(currency) ? getPropertyValue(CryptoConfig.get(), [currency, 'fractional_digits']) : 2;
};
let currencies_config = {};
export const getDecimalPlaces = currency =>
    // need to check currencies_config[currency] exists instead of || in case of 0 value
    currencies_config[currency]
        ? getPropertyValue(currencies_config, [currency, 'fractional_digits'])
        : calcDecimalPlaces(currency);

export const routes = {
    error404: '/404',
    account: '/account',
    financial_assessment: '/account/financial-assessment',
    personal_details: '/account/personal-details',
    proof_of_identity: '/account/proof-of-identity',
    proof_of_address: '/account/proof-of-address',
    passwords: '/account/passwords',
    closing_account: '/account/closing-account',
    deactivate_account: '/account/deactivate-account', // TODO: Remove once mobile team has changed this link
    account_closed: '/account-closed',
    account_limits: '/account/account-limits',
    connected_apps: '/account/connected-apps',
    api_token: '/account/api-token',
    login_history: '/account/login-history',
    two_factor_authentication: '/account/two-factor-authentication',
    self_exclusion: '/account/self-exclusion',
    account_password: '/settings/account_password',
    apps: '/settings/apps',
    cashier_password: '/settings/cashier_password',
    contract: '/contract/:contract_id',
    exclusion: '/settings/exclusion',
    financial: '/settings/financial',
    history: '/settings/history',
    index: '/index',
    limits: '/settings/limits',
    mt5: '/mt5',
    dxtrade: '/derivx',
    personal: '/settings/personal',
    positions: '/reports/positions',
    profit: '/reports/profit',
    reports: '/reports',
    root: '/',
    reset_password: '/',
    redirect: '/redirect',
    settings: '/settings',
    statement: '/reports/statement',
    token: '/settings/token',
    trade: '/',
    bot: '/bot',
    cashier: '/cashier',
    cashier_deposit: '/cashier/deposit',
    cashier_withdrawal: '/cashier/withdrawal',
    cashier_pa: '/cashier/payment-agent',
    cashier_acc_transfer: '/cashier/account-transfer',
    cashier_crypto_transactions: '/cashier/crypto-transactions',
    // cashier_offramp: '/cashier/off-ramp',
    cashier_onramp: '/cashier/on-ramp',
    cashier_p2p: '/cashier/p2p',
    cashier_p2p_verification: '/cashier/p2p/verification',
    cashier_pa_transfer: '/cashier/payment-agent-transfer',
    endpoint: '/endpoint',
    complaints_policy: '/complaints-policy',

    // Appstore
    trading_hub: '/trading-hub',
};
const config_data = {
    brand_name: 'Deriv',
    domain_name: 'Deriv.com',
    legal_entities: {
        fx: 'Deriv (FX) Ltd',
        malta: 'Deriv (Europe) Limited',
        maltainvest: 'Deriv Investments (Europe) Limited',
        mx: 'Deriv (MX) Ltd',
        samoa: 'Deriv Capital International Ltd',
        svg: 'Deriv (SVG) LLC',
        v: 'Deriv (V) Ltd',
    },
    platforms: {
        trader: {
            name: 'DTrader Air',
            icon: 'IcBrandDtrader',
        },
        dbot: {
            name: 'DBot',
            icon: 'IcBrandDbot',
        },
        mt5: {
            name: 'Deriv MT5',
            icon: 'IcBrandDmt5',
        },
        dxtrade: {
            name: 'Deriv X',
            icon: 'IcBrandDxtrade',
        },
        smarttrader: {
            name: 'SmartTrader',
            icon: 'IcBrandSmarttrader',
        },
        bbot: {
            name: 'Binary Bot',
            icon: 'IcBrandBinarybot',
        },
        go: {
            name: 'Deriv Go',
        },
    },
};
export const isTablet = () => window.innerWidth > 926 && window.innerWidth <= 1081;
export const isMobile = () => window.innerWidth <= 926;
export const isDesktop = () => isTablet() || window.innerWidth > 1081;

export const getPlatformSettings = platform_key => {
    return config_data.platforms[platform_key];
};

export const platform_name = Object.freeze({
    DBot: getPlatformSettings('dbot').name,
    DTrader: getPlatformSettings('trader').name,
    DXtrade: getPlatformSettings('dxtrade').name,
    DMT5: getPlatformSettings('mt5').name,
    SmartTrader: getPlatformSettings('smarttrader').name,
    BinaryBot: getPlatformSettings('bbot').name,
});

export const getPlatformInformation = () => {
    return { header: platform_name.DTrader, icon: getPlatformSettings('trader').icon };
};

export const platforms = {
    p2p: {
        icon_text: undefined,
        is_hard_redirect: true,
        platform_name: 'Deriv P2P',
        route_to_path: routes.cashier_p2p,
        url: 'https://app.deriv.com/cashier/p2p',
    },
    derivgo: {
        icon_text: undefined,
        is_hard_redirect: false,
        platform_name: 'Deriv Go',
        route_to_path: '',
        url: '',
    },
};
export const deepFreeze = obj => {
    Object.getOwnPropertyNames(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object' && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    });
    return Object.freeze(obj);
};
export const CryptoConfig = (() => {
    let crypto_config;

    // TODO: [use-shared-i18n] - Use translate function shared among apps or pass in translated names externally.
    const initCryptoConfig = () =>
        deepFreeze({
            BTC: {
                display_code: 'BTC',
                name: 'Bitcoin',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 8,
            },
            BUSD: {
                display_code: 'BUSD',
                name: 'Binance USD',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            DAI: {
                display_code: 'DAI',
                name: 'Multi-Collateral DAI',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            EURS: {
                display_code: 'EURS',
                name: 'STATIS Euro',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            IDK: {
                display_code: 'IDK',
                name: 'IDK',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 0,
            },
            PAX: {
                display_code: 'PAX',
                name: 'Paxos Standard',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            TUSD: {
                display_code: 'TUSD',
                name: 'True USD',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            USDC: {
                display_code: 'USDC',
                name: 'USD Coin',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            USDK: {
                display_code: 'USDK',
                name: 'USDK',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            eUSDT: {
                display_code: 'eUSDT',
                name: 'Tether ERC20',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            tUSDT: {
                display_code: 'tUSDT',
                name: 'Tether TRC20',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 2,
            },
            BCH: {
                display_code: 'BCH',
                name: 'Bitcoin Cash',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 8,
            },
            ETH: {
                display_code: 'ETH',
                name: 'Ether',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 8,
            },
            ETC: {
                display_code: 'ETC',
                name: 'Ether Classic',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 8,
            },
            LTC: {
                display_code: 'LTC',
                name: 'Litecoin',
                min_withdrawal: 0.002,
                pa_max_withdrawal: 5,
                pa_min_withdrawal: 0.002,
                fractional_digits: 8,
            },
            UST: {
                display_code: 'USDT',
                name: 'Tether Omni',
                min_withdrawal: 0.02,
                pa_max_withdrawal: 2000,
                pa_min_withdrawal: 10,
                fractional_digits: 2,
            },
            // USB: {
            //     display_code: 'USB',
            //     name: 'Binary Coin',
            //     min_withdrawal: 0.02,
            //     pa_max_withdrawal: 2000,
            //     pa_min_withdrawal: 10,
            //     fractional_digits: 2,
            // },
        });

    return {
        get: () => {
            if (!crypto_config) {
                crypto_config = initCryptoConfig();
            }
            return crypto_config;
        },
    };
})();

export const MobileWrapper = ({ children }) => {
    if (!isMobile()) return null;

    return children;
};

export const DesktopWrapper = ({ children }) => {
    if (!isDesktop()) return null;
    return children;
};
