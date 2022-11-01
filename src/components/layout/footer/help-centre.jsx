import React from 'react';
import Popover from 'components/popover';
import StaticUrl from 'components/static-url';
import { localize } from 'translations';
import IcHelpCentre from 'assets/icons/common/ic-help-centre.svg';

export const HelpCentre = () => (
    <StaticUrl href='/help-centre/' id='dt_help_centre' aria-label={localize('Help centre')} className='footer__link'>
        <Popover classNameBubble='help-centre__tooltip' alignment='top' message={localize('Help centre')} zIndex={9999}>
            <img src={IcHelpCentre} className='footer__icon' alt='ic-help-centre' />
        </Popover>
    </StaticUrl>
);
