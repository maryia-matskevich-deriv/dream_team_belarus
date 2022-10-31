import React from 'react';
import Popover from 'components/popover';
import StaticUrl from 'components/static-url';
import { localize } from 'translations';
import { deriv_urls } from 'utils/url';
import IcDerivOutline from 'assets/icons/common/ic-deriv-outline.svg';

export const GoToDeriv = () => {
    const message = localize('Go to {{hostname}}', { hostname: deriv_urls.DERIV_HOST_NAME });

    return (
        <StaticUrl href='/' className='footer__link'>
            <Popover alignment='top' message={message} zIndex={9999}>
                <img src={IcDerivOutline} className='footer__icon ic-deriv__icon' alt='ic-deriv-outline' />
            </Popover>
        </StaticUrl>
    );
};
