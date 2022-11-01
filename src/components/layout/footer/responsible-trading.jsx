import React from 'react';
import Popover from 'components/popover';
import StaticUrl from 'components/static-url';
import { localize } from 'translations';
import IcVerification from 'assets/icons/common/ic-verification.svg';

export const ResponsibleTrading = () => (
    <StaticUrl href='/responsible' className='footer__link'>
        <Popover alignment='top' message={localize('Responsible trading')} zIndex={9999}>
            <img src={IcVerification} className='footer__icon ic-deriv__icon' alt='ic-verification' />
        </Popover>
    </StaticUrl>
);
