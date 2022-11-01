import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import Button from 'components/button';
import DesktopWrapper from 'components/desktop-wrapper';
import MobileWrapper from 'components/mobile-wrapper';
import Money from 'components/money';
import Tabs from 'components/tabs';
import Text from 'components/text';
import { useOnClickOutside } from 'hooks';
import { formatMoney } from 'utils';
import { localize, Localize } from 'translations';
import { getAccountTitle } from './helpers/constants';
import { getExchangeRate } from 'utils/Utils/ExchangeCurrencyRate/exchange_currency_rate';
import AccountList from './account-switcher-account-list.jsx';
import AccountWrapper from './account-switcher-account-wrapper.jsx';
import { getSortedAccountList, getSortedCFDList, isDemo } from './helpers';
import { getCurrencyIcon } from '../constants/currency-icons-config.js';
import IcDeriv from 'assets/icons/common/ic-deriv.svg';
import IcLogout from 'assets/icons/common/ic-logout.svg';

const AccountSwitcher = ({ is_mobile, is_visible }) => {
    const { client, common, ui } = useStore();
    const {
        available_crypto_currencies,
        accounts,
        account_type,
        can_change_fiat_currency,
        account_list,
        can_upgrade_to,
        residence: client_residence,
        country_standpoint,
        is_eu,
        is_logged_in,
        is_virtual,
        has_any_real_account,
        has_fiat,
        landing_company_shortcode,
        loginid: account_loginid,
        mt5_login_list,
        obj_total_balance,
        switchAccount,
        resetVirtualBalance,
        logout: logoutClient,
        upgradeable_landing_companies,
    } = client;
    const { routeBackInApp } = common;
    const {
        is_dark_mode_on,
        is_positions_drawer_on,
        openRealAccountSignup,
        toggleAccountsDialog,
        togglePositionsDrawer,
        toggleSetCurrencyModal,
        should_show_real_accounts_list,
    } = ui;

    const [active_tab_index, setActiveTabIndex] = React.useState(
        !is_virtual || should_show_real_accounts_list ? 0 : 1
    );
    const [is_deriv_demo_visible, setDerivDemoVisible] = React.useState(true);
    const [is_deriv_real_visible, setDerivRealVisible] = React.useState(true);
    const [exchanged_rate_demo, setExchangedRateDemo] = React.useState(1);

    const wrapper_ref = React.useRef();
    const scroll_ref = React.useRef(null);

    const account_total_balance_currency = obj_total_balance.currency;
    const vrtc_loginid = account_list.find(account => account.is_virtual).loginid;
    const vrtc_currency = accounts[vrtc_loginid] ? accounts[vrtc_loginid].currency : 'USD';

    React.useEffect(() => {
        const getCurrentExchangeRate = (currency, setExchangeRate) => {
            getExchangeRate(currency, account_total_balance_currency).then(res => {
                setExchangeRate(res);
            });
        };
        if (vrtc_currency !== account_total_balance_currency) {
            getCurrentExchangeRate(vrtc_currency, setExchangedRateDemo);
        }
    }, []);

    const toggleVisibility = section => {
        switch (section) {
            case 'demo_deriv':
                return setDerivDemoVisible(!is_deriv_demo_visible);
            case 'real_deriv':
                return setDerivRealVisible(!is_deriv_real_visible);
            default:
                return false;
        }
    };

    const handleLogout = async () => {
        closeAccountsDialog();
        if (is_positions_drawer_on) {
            togglePositionsDrawer(); // TODO: hide drawer inside logout, once it is a mobx action
        }
        routeBackInApp(window.history);
        await logoutClient();
    };

    const closeAccountsDialog = () => {
        toggleAccountsDialog(false);
    };

    const validateClickOutside = event => is_visible && !event.target.classList.contains('acc-info');

    useOnClickOutside(wrapper_ref, closeAccountsDialog, validateClickOutside);

    const setAccountCurrency = () => {
        closeAccountsDialog();
        toggleSetCurrencyModal();
    };

    const doSwitch = async loginid => {
        closeAccountsDialog();
        if (account_loginid === loginid) return;
        await switchAccount(loginid);
    };

    const resetBalance = async () => {
        closeAccountsDialog();
        resetVirtualBalance();
    };

    // Real accounts is always the first tab index based on design
    const isRealAccountTab = active_tab_index === 0;

    const getRealMT5 = () => {
        return getSortedCFDList(mt5_login_list).filter(account => !isDemo(account));
    };

    const canOpenMulti = () => {
        if (available_crypto_currencies.length < 1 && !has_fiat) return true;
        return !is_virtual;
    };

    const is_regulated_able_to_change_currency =
        is_eu &&
        (landing_company_shortcode === 'malta' ||
            (landing_company_shortcode === 'iom' && upgradeable_landing_companies.length !== 0));

    // SVG clients can't upgrade.
    const getRemainingRealAccounts = () => {
        if (is_eu || is_virtual || !canOpenMulti() || is_regulated_able_to_change_currency) {
            return upgradeable_landing_companies;
        }
        return [];
    };

    const hasSetCurrency = () => {
        return account_list.filter(account => !account.is_virtual).some(account => account.title !== 'Real');
    };

    const canUpgrade = () => {
        return !!(is_virtual && can_upgrade_to);
    };

    const getTotalDemoAssets = () => {
        const vrtc_balance = accounts[vrtc_loginid] ? accounts[vrtc_loginid].balance : 0;

        return vrtc_currency !== account_total_balance_currency ? vrtc_balance * exchanged_rate_demo : vrtc_balance;
    };

    if (!is_logged_in) return false;

    const canResetBalance = account => {
        const account_init_balance = 10000;
        return account.is_virtual && account.balance !== account_init_balance;
    };

    const checkMultipleSvgAcc = () => {
        const all_svg_acc = [];
        getRealMT5().map(acc => {
            if (acc.landing_company_short === 'svg' && acc.market_type === 'synthetic') {
                if (all_svg_acc.length) {
                    all_svg_acc.forEach(svg_acc => {
                        if (svg_acc.server !== acc.server) all_svg_acc.push(acc);
                        return all_svg_acc;
                    });
                } else {
                    all_svg_acc.push(acc);
                }
            }
        });
        return all_svg_acc.length > 1;
    };

    const total_assets_message = isRealAccountTab
        ? localize('Total assets in your Deriv real accounts.')
        : localize('Total assets in your Deriv demo accounts.');

    const demo_accounts = (
        <div className='acc-switcher__list-wrapper'>
            <AccountWrapper
                header={localize('Deriv Accounts')}
                is_visible={is_deriv_demo_visible}
                toggleVisibility={() => {
                    toggleVisibility('demo_deriv');
                }}
            >
                <div className='acc-switcher__accounts'>
                    {getSortedAccountList(account_list, accounts)
                        .filter(account => account.is_virtual)
                        .map(account => (
                            <AccountList
                                is_dark_mode_on={is_dark_mode_on}
                                key={account.loginid}
                                balance={accounts[account.loginid].balance}
                                currency={accounts[account.loginid].currency}
                                currency_icon={getCurrencyIcon(account.icon, is_virtual)}
                                country_standpoint={country_standpoint}
                                display_type={'currency'}
                                has_balance={'balance' in accounts[account.loginid]}
                                has_reset_balance={canResetBalance(accounts[account_loginid])}
                                is_disabled={account.is_disabled}
                                is_virtual={account.is_virtual}
                                loginid={account.loginid}
                                redirectAccount={account.is_disabled ? undefined : () => doSwitch(account.loginid)}
                                onClickResetVirtualBalance={resetBalance}
                                selected_loginid={account_loginid}
                            />
                        ))}
                </div>
            </AccountWrapper>
        </div>
    );

    const real_accounts = (
        <div ref={scroll_ref} className='acc-switcher__list-wrapper'>
            <React.Fragment>
                <AccountWrapper
                    header={localize('Deriv Accounts')}
                    is_visible={is_deriv_real_visible}
                    toggleVisibility={() => {
                        toggleVisibility('real_deriv');
                    }}
                >
                    <div className='acc-switcher__accounts'>
                        {getSortedAccountList(account_list, accounts)
                            .filter(account => !account.is_virtual)
                            .map(account => {
                                return (
                                    <AccountList
                                        account_type={account_type}
                                        is_dark_mode_on={is_dark_mode_on}
                                        key={account.loginid}
                                        balance={accounts[account.loginid].balance}
                                        currency={accounts[account.loginid].currency}
                                        currency_icon={getCurrencyIcon(account.icon, is_virtual)}
                                        country_standpoint={country_standpoint}
                                        display_type={'currency'}
                                        has_balance={'balance' in accounts[account.loginid]}
                                        is_disabled={account.is_disabled}
                                        is_virtual={account.is_virtual}
                                        is_eu={is_eu}
                                        loginid={account.loginid}
                                        redirectAccount={
                                            account.is_disabled ? undefined : () => doSwitch(account.loginid)
                                        }
                                        selected_loginid={account_loginid}
                                        should_show_server_name={checkMultipleSvgAcc()}
                                    />
                                );
                            })}
                    </div>
                    {getRemainingRealAccounts().map((account, index) => (
                        <div key={index} className='acc-switcher__new-account'>
                            <img src={IcDeriv} width={24} height={24} />
                            <Text size='xs' color='general' className='acc-switcher__new-account-text'>
                                {getAccountTitle(
                                    account,
                                    { account_residence: client_residence },
                                    country_standpoint
                                )}
                            </Text>
                            <Button
                                id='dt_core_account-switcher_add-new-account'
                                onClick={() => {
                                    openRealAccountSignup(account);
                                }}
                                className='acc-switcher__new-account-btn'
                                secondary
                                small
                            >
                                {localize('Add')}
                            </Button>
                        </div>
                    ))}
                    {!canUpgrade() &&
                        canOpenMulti() &&
                        (!is_eu || (is_eu && can_change_fiat_currency)) && (
                            <Button
                                className='acc-switcher__btn'
                                secondary
                                onClick={
                                    has_any_real_account && !hasSetCurrency()
                                        ? setAccountCurrency
                                        : () => openRealAccountSignup('manage')
                                }
                            >
                                {has_fiat && available_crypto_currencies?.length === 0
                                    ? localize('Manage account')
                                    : localize('Add or manage account')}
                            </Button>
                        )}
                </AccountWrapper>
            </React.Fragment>
        </div>
    );

    return (
        <div className='acc-switcher__list' ref={wrapper_ref}>
            <Tabs
                active_index={active_tab_index}
                className='acc-switcher__list-tabs'
                onTabItemClick={index => setActiveTabIndex(index)}
                top
            >
                {/* TODO: De-couple and refactor demo and real accounts groups
                        into a single reusable AccountListItem component */}
                <div label={localize('Real')} id='real_account_tab'>
                    <DesktopWrapper>
                        <div style={{ overflowY: 'auto', height: '354px' }}>{real_accounts}</div>
                    </DesktopWrapper>
                    <MobileWrapper>
                        <div className='acc-switcher__list-container'>{real_accounts}</div>
                    </MobileWrapper>
                </div>
                <div label={localize('Demo')} id='dt_core_account-switcher_demo-tab'>
                    <DesktopWrapper>
                        <div style={{ overflowY: 'auto', height: '354px' }}>{demo_accounts}</div>
                    </DesktopWrapper>
                    <MobileWrapper>
                        <div className='acc-switcher__list-container'>{demo_accounts}</div>
                    </MobileWrapper>
                </div>
            </Tabs>
            <div
                className={classNames('acc-switcher__separator', {
                    'acc-switcher__separator--auto-margin': is_mobile,
                })}
            />
            <div className='acc-switcher__total'>
                <Text line_height='s' size='xs' weight='bold' color='prominent'>
                    <Localize i18n_default_text='Total assets' />
                </Text>
                <Text size='xs' color='prominent' className='acc-switcher__balance'>
                    <Money
                        currency={account_total_balance_currency}
                        amount={formatMoney(
                            account_total_balance_currency,
                            isRealAccountTab ? obj_total_balance.amount_real : getTotalDemoAssets(),
                            true
                        )}
                        show_currency
                        should_format={false}
                    />
                </Text>
            </div>
            <Text color='less-prominent' line_height='xs' size='xxxs' className='acc-switcher__total-subtitle'>
                {total_assets_message}
            </Text>
            <div className='acc-switcher__separator' />
            <div className='acc-switcher__footer'>
                <div id='dt_logout_button' className='acc-switcher__logout' onClick={handleLogout}>
                    <Text color='prominent' size='xs' align='left' className='acc-switcher__logout-text'>
                        {localize('Log out')}
                    </Text>
                    <img src={IcLogout} className='acc-switcher__logout-icon drawer__icon' onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

AccountSwitcher.propTypes = {
    available_crypto_currencies: PropTypes.array,
    account_list: PropTypes.array,
    account_loginid: PropTypes.string,
    accounts: PropTypes.object,
    account_settings: PropTypes.object,
    account_type: PropTypes.string,
    can_change_fiat_currency: PropTypes.bool,
    can_upgrade_to: PropTypes.string,
    client_residence: PropTypes.string,
    country_standpoint: PropTypes.object,
    has_active_real_account: PropTypes.bool,
    has_any_real_account: PropTypes.bool,
    has_fiat: PropTypes.bool,
    has_malta_account: PropTypes.bool,
    has_maltainvest_account: PropTypes.bool,
    isAccountOfTypeDisabled: PropTypes.func,
    is_dark_mode_on: PropTypes.bool,
    is_dxtrade_allowed: PropTypes.bool,
    is_eu: PropTypes.bool,
    is_fully_authenticated: PropTypes.bool,
    is_loading_dxtrade: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_mobile: PropTypes.bool,
    is_pending_authentication: PropTypes.bool,
    is_positions_drawer_on: PropTypes.bool,
    is_upgrade_enabled: PropTypes.bool,
    is_virtual: PropTypes.bool,
    is_visible: PropTypes.bool,
    landing_company_shortcode: PropTypes.string,
    logoutClient: PropTypes.func,
    mt5_login_list: PropTypes.array,
    dxtrade_disabled_signup_types: PropTypes.object,
    obj_total_balance: PropTypes.object,
    openAccountNeededModal: PropTypes.func,
    openDerivRealAccountNeededModal: PropTypes.func,
    openRealAccountSignup: PropTypes.func,
    routeBackInApp: PropTypes.func,
    should_show_real_accounts_list: PropTypes.bool,
    standpoint: PropTypes.object,
    switchAccount: PropTypes.func,
    resetVirtualBalance: PropTypes.func,
    toggle: PropTypes.func,
    toggleAccountsDialog: PropTypes.func,
    togglePositionsDrawer: PropTypes.func,
    toggleSetCurrencyModal: PropTypes.func,
    trading_platform_available_accounts: PropTypes.array,
    upgradeable_landing_companies: PropTypes.array,
};

const account_switcher = observer(AccountSwitcher);

export { account_switcher as AccountSwitcher };
