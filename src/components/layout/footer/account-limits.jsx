import React from 'react';
import { Link } from 'react-router-dom';
import Popover from 'components/popover';
import { routes } from 'utils';
import { localize } from 'translations';
import IcAccountLimits from 'assets/icons/common/ic-account-limits.svg';

export const AccountLimits = () => (
    <Link to={routes.account_limits} className='footer__link'>
        <Popover alignment='top' message={localize('Account limits')} zIndex={9999}>
            <img src={IcAccountLimits} className='footer__icon ic-deriv__icon' alt='ic-account-limits' />
        </Popover>
    </Link>
);
