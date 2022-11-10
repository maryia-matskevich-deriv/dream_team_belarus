import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import DesktopWrapper from 'components/desktop-wrapper';
import { routes, isMobile, platforms } from 'utils';
import { AccountActions, MenuLinks, PlatformSwitcher } from '.';
import platform_config from './constants/platform-config';
import { useStore } from 'store';

// TODO: adjust and apply this header
const Header = () => {
    const { client, common, ui, menu } = useStore();
    const {
        account_type,
        balance,
        currency,
        country_standpoint,
        is_bot_allowed,
        is_eu,
        is_logged_in,
        is_logging_in,
        is_mt5_allowed,
        is_dxtrade_allowed,
        is_virtual,
    } = client;
    const { platform } = common;
    const { extensions: menu_items } = menu;
    const {
        account_switcher_disabled_message: acc_switcher_disabled_message,
        disableApp,
        enableApp,
        is_account_switcher_disabled: is_acc_switcher_disabled,
        is_accounts_switcher_on: is_acc_switcher_on,
        is_app_disabled,
        is_route_modal_on,
        openRealAccountSignup,
        toggleAccountsDialog,
    } = ui;
    const navigate = useNavigate();

    const onClickDeposit = () => navigate(routes.cashier_deposit);
    const filterPlatformsForClients = payload =>
        payload.filter(config => {
            if (config.link_to === routes.mt5) {
                return !is_logged_in || is_mt5_allowed;
            }
            if (config.link_to === routes.dxtrade) {
                return is_dxtrade_allowed;
            }
            if (
                config.link_to === routes.bot ||
                config.href === routes.binarybot ||
                config.href === routes.smarttrader
            ) {
                return is_bot_allowed;
            }
            return true;
        });
    return (
        <header
            className={classNames('header', {
                'header--is-disabled': is_app_disabled || is_route_modal_on,
                'header--is-hidden': platforms[platform],
            })}
        >
            <div className='header__menu-items'>
                <div className='header__menu-left'>
                    <DesktopWrapper>
                        <PlatformSwitcher
                            platform_config={filterPlatformsForClients(platform_config)}
                        />
                    </DesktopWrapper>
                    <MenuLinks is_logged_in={is_logged_in} items={menu_items} />
                </div>
                <div
                    className={classNames('header__menu-right', {
                        'header__menu-right--hidden': isMobile() && is_logging_in,
                    })}
                >
                    <div id={'dt_core_header_acc-info-container'} className='acc-info__container'>
                        <AccountActions
                            acc_switcher_disabled_message={acc_switcher_disabled_message}
                            account_type={account_type}
                            balance={balance}
                            currency={currency}
                            country_standpoint={country_standpoint}
                            disableApp={disableApp}
                            enableApp={enableApp}
                            is_acc_switcher_on={is_acc_switcher_on}
                            is_acc_switcher_disabled={is_acc_switcher_disabled}
                            is_eu={is_eu}
                            // is_notifications_visible={is_notifications_visible} no notifications-store yet
                            is_logged_in={is_logged_in}
                            is_virtual={is_virtual}
                            onClickDeposit={onClickDeposit}
                            // notifications_count={notifications_count}
                            toggleAccountsDialog={toggleAccountsDialog}
                            // toggleNotifications={toggleNotifications}
                            openRealAccountSignup={openRealAccountSignup}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    acc_switcher_disabled_message: PropTypes.string,
    account_type: PropTypes.string,
    should_allow_authentication: PropTypes.bool,
    account_status: PropTypes.object,
    addNotificationMessage: PropTypes.func,
    balance: PropTypes.string,
    client_notifications: PropTypes.object,
    currency: PropTypes.string,
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    header_extension: PropTypes.any,
    is_acc_switcher_disabled: PropTypes.bool,
    is_acc_switcher_on: PropTypes.bool,
    is_app_disabled: PropTypes.bool,
    is_bot_allowed: PropTypes.bool,
    is_dark_mode: PropTypes.bool,
    is_eu: PropTypes.bool,
    is_loading: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_logging_in: PropTypes.bool,
    is_mt5_allowed: PropTypes.bool,
    is_dxtrade_allowed: PropTypes.bool,
    is_notifications_visible: PropTypes.bool,
    is_account_transfer_visible: PropTypes.bool,
    // is_p2p_enabled: PropTypes.bool,
    // is_payment_agent_transfer_visible: PropTypes.bool,
    // is_payment_agent_visible: PropTypes.bool,
    is_route_modal_on: PropTypes.bool,
    is_virtual: PropTypes.bool,
    logoutClient: PropTypes.func,
    notifications_count: PropTypes.number,
    openRealAccountSignup: PropTypes.func,
    platform: PropTypes.string,
    removeNotificationMessage: PropTypes.func,
    replaceCashierMenuOnclick: PropTypes.func,
    setDarkMode: PropTypes.func,
    toggleAccountsDialog: PropTypes.func,
    toggleNotifications: PropTypes.func,
    is_social_signup: PropTypes.bool,
    country_standpoint: PropTypes.object,
    is_onramp_tab_visible: PropTypes.bool,
    is_p2p_enabled: PropTypes.bool,
    is_payment_agent_transfer_visible: PropTypes.bool,
    is_payment_agent_visible: PropTypes.bool,
    menu_items: PropTypes.array,
    changeCurrentLanguage: PropTypes.func,
};

export default observer(Header);
