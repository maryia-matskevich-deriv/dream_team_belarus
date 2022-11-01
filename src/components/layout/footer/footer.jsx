import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import NetworkStatus, {
    AccountLimits as AccountLimitsFooter,
    GoToDeriv,
    HelpCentre,
    RegulatoryInformation,
    ResponsibleTrading,
    ToggleFullScreen,
    ServerTime,
} from '.';
import LiveChat from '../live-chat';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import 'styles/layout/footer.scss';

const FooterIconSeparator = () => <div className='footer-icon-separator' />;

const FooterExtensionRenderer = (footer_extension, idx) => {
    const { Component: FooterExtensionComponent } = footer_extension;
    return (
        <React.Fragment key={`footer-link-${footer_extension.position}-${idx}`}>
            {footer_extension.has_left_separator && <FooterIconSeparator />}
            <FooterExtensionComponent />
            {footer_extension.has_right_separator && <FooterIconSeparator />}
        </React.Fragment>
    );
};

const Footer = () => {
    const { client, ui } = useStore();
    const { is_logged_in, is_eu, is_virtual, landing_company_shortcode } = client;
    const { footer_extensions, is_app_disabled, is_route_modal_on } = ui;
    let footer_extensions_left = [];
    let footer_extensions_right = [];
    if (footer_extensions.filter) {
        footer_extensions_left = footer_extensions.filter(footer_extension => footer_extension.position === 'left');
        footer_extensions_right = footer_extensions.filter(footer_extension => footer_extension.position === 'right');
    }

    return (
        <footer
            className={classNames('footer', {
                'footer--is-disabled': is_app_disabled || is_route_modal_on,
            })}
        >
            {footer_extensions_left.length > 0 && (
                <div className='footer__links footer__links--left'>
                    {footer_extensions_left.map(FooterExtensionRenderer)}
                </div>
            )}
            <NetworkStatus />
            <ServerTime />
            <div className='footer__links'>
                {footer_extensions_right.map(FooterExtensionRenderer)}
                <LiveChat />
                <FooterIconSeparator />
                <GoToDeriv />
                <ResponsibleTrading />
                {is_logged_in && <AccountLimitsFooter />}
                {is_logged_in && !is_virtual && (
                    <RegulatoryInformation landing_company={landing_company_shortcode} is_eu={is_eu} />
                )}
                <FooterIconSeparator />
                <HelpCentre />
                <ToggleFullScreen />
            </div>
        </footer>
    );
};

Footer.propTypes = {
    is_app_disabled: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_route_modal_on: PropTypes.bool,
    landing_company_shortcode: PropTypes.string,
    is_virtual: PropTypes.bool,
    is_eu: PropTypes.bool,
    footer_extensions: PropTypes.array,
};

export default observer(Footer);
