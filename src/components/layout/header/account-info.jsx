import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DesktopWrapper from 'components/desktop-wrapper';
import MobileWrapper from 'components/mobile-wrapper';
import Popover from 'components/popover';
import Text from 'components/text';
import { Localize } from 'translations';
import { getCurrencyDisplayCode } from 'utils';
import AccountSwitcherMobile from './account-switcher/account-switcher-mobile.jsx';
import { AccountSwitcher } from './account-switcher';
import { getCurrencyIcon } from 'components/icon';
import IcLock from 'assets/icons/common/ic-lock.svg';
import IcChevronDownBold from 'assets/icons/common/ic-chevron-down-bold.svg';

const AccountInfoWrapper = ({ is_disabled, disabled_message, children }) =>
    is_disabled && disabled_message ? (
        <Popover alignment='left' message={disabled_message} zIndex={99999}>
            {children}
        </Popover>
    ) : (
        <React.Fragment>{children}</React.Fragment>
    );

AccountInfoWrapper.propTypes = {
    is_disabled: PropTypes.bool,
    disabled_message: PropTypes.string,
    children: PropTypes.node,
};

const AccountInfoIcon = ({ is_virtual, currency }) => (
    <img
        src={getCurrencyIcon(currency, is_virtual)}
        className={`acc-info__id-icon acc-info__id-icon--${is_virtual ? 'virtual' : currency}`}
        width={24}
        height={24}
    />
);

AccountInfoIcon.propTypes = {
    currency: PropTypes.string,
    is_virtual: PropTypes.bool,
};

const DisplayAccountType = ({ account_type, country_standpoint, is_eu }) => {
    if (account_type === 'financial') {
        return <Localize i18n_default_text='Multipliers' />;
    } else if (account_type === 'gaming') {
        if (country_standpoint.is_isle_of_man) return null;
        if (country_standpoint.is_united_kingdom) {
            return <Localize i18n_default_text='Gaming' />;
        }
        if (is_eu || country_standpoint.is_belgium) {
            return <Localize i18n_default_text='Options' />;
        }
        return <Localize i18n_default_text='Derived' />;
    }
    return null;
};

DisplayAccountType.propTypes = {
    account_type: PropTypes.string,
    country_standpoint: PropTypes.object,
    is_eu: PropTypes.bool,
};

const AccountInfo = ({
    acc_switcher_disabled_message,
    account_type,
    balance,
    currency,
    country_standpoint,
    disableApp,
    enableApp,
    is_dialog_on,
    is_eu,
    is_virtual,
    toggleDialog,
    is_disabled,
}) => {
    const currency_lower = currency.toLowerCase();
    return (
        <div className='acc-info__wrapper'>
            <div className='acc-info__separator' />
            <AccountInfoWrapper is_disabled={is_disabled} disabled_message={acc_switcher_disabled_message}>
                <div
                    id='dt_core_account-info_acc-info'
                    className={classNames('acc-info', {
                        'acc-info--show': is_dialog_on,
                        'acc-info--is-virtual': is_virtual,
                        'acc-info--is-disabled': is_disabled,
                    })}
                    onClick={is_disabled ? undefined : () => toggleDialog()}
                >
                    <span className='acc-info__id'>
                        <DesktopWrapper>
                            <AccountInfoIcon is_virtual={is_virtual} currency={currency_lower} />
                        </DesktopWrapper>
                        <MobileWrapper>
                            {(is_virtual || currency) && (
                                <AccountInfoIcon is_virtual={is_virtual} currency={currency_lower} />
                            )}
                        </MobileWrapper>
                    </span>
                    {(typeof balance !== 'undefined' || !currency) && (
                        <div className='acc-info__account-type-and-balance'>
                            <p
                                className={classNames('acc-info__balance', {
                                    'acc-info__balance--no-currency': !currency && !is_virtual,
                                })}
                            >
                                {!currency ? (
                                    <Localize i18n_default_text='No currency assigned' />
                                ) : (
                                    `${balance} ${getCurrencyDisplayCode(currency)}`
                                )}
                            </p>
                            <Text size='xxxs' line_height='s'>
                                <DisplayAccountType
                                    account_type={account_type}
                                    country_standpoint={country_standpoint}
                                    is_eu={is_eu}
                                />
                            </Text>
                        </div>
                    )}
                    {is_disabled ? (
                        <img src={IcLock} />
                    ) : (
                        <img src={IcChevronDownBold} className='acc-info__select-arrow' />
                    )}
                </div>
            </AccountInfoWrapper>
            <MobileWrapper>
                <AccountSwitcherMobile
                    is_visible={is_dialog_on}
                    disableApp={disableApp}
                    enableApp={enableApp}
                    toggle={toggleDialog}
                />
            </MobileWrapper>
            <DesktopWrapper>
                <CSSTransition
                    in={is_dialog_on}
                    timeout={200}
                    classNames={{
                        enter: 'acc-switcher__wrapper--enter',
                        enterDone: 'acc-switcher__wrapper--enter-done',
                        exit: 'acc-switcher__wrapper--exit',
                    }}
                    unmountOnExit
                >
                    <div className='acc-switcher__wrapper'>
                        <AccountSwitcher is_visible={is_dialog_on} toggle={toggleDialog} />
                    </div>
                </CSSTransition>
            </DesktopWrapper>
        </div>
    );
};

AccountInfo.propTypes = {
    acc_switcher_disabled_message: PropTypes.string,
    account_type: PropTypes.string,
    balance: PropTypes.string,
    currency: PropTypes.string,
    country_standpoint: PropTypes.object,
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    is_dialog_on: PropTypes.bool,
    is_disabled: PropTypes.bool,
    is_eu: PropTypes.bool,
    is_virtual: PropTypes.bool,
    loginid: PropTypes.string,
    toggleDialog: PropTypes.func,
};

export default AccountInfo;
