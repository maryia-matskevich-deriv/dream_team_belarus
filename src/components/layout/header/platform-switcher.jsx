import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Text from 'components/text';
import { platforms_icons, isMobile, getPlatformSettings } from 'utils';
import { PlatformDropdown } from './platform-dropdown.jsx';
import 'styles/platform-switcher.scss';
import IcChevronDownBold from 'assets/icons/common/ic-chevron-down-bold.svg';

const PlatformSwitcher = ({ toggleDrawer, platform_config }) => {
    const [is_open, setIsOpen] = React.useState(false);

    const is_close_drawer_fired_ref = React.useRef(false);

    React.useEffect(() => {
        if (is_close_drawer_fired_ref.current) {
            if (typeof toggleDrawer === 'function') {
                toggleDrawer();
            }
        }
        is_close_drawer_fired_ref.current = false;
    });

    const closeDrawer = () => {
        setIsOpen(false);
        is_close_drawer_fired_ref.current = true;
    };

    return (
        <React.Fragment>
            <div
                className={classNames(
                    'platform-switcher',
                    { 'platform-switcher--active': is_open },
                    { 'platform-switcher--is-mobile': isMobile() }
                )}
                onClick={() => setIsOpen(!is_open)}
            >
                <img
                    className='platform-switcher__icon'
                    src={platforms_icons.deriv_air}
                    width={32}
                    height={32}
                />
                <Text as='h1' styles={{ lineHeight: '2.4rem' }} weight='bold'>
                    {getPlatformSettings('deriv_air').name}
                </Text>
                <img className='platform-switcher__arrow' src={IcChevronDownBold} />
            </div>
            <CSSTransition
                mountOnEnter
                appear
                in={is_open}
                classNames={{
                    enterDone: 'platform-dropdown--enter-done',
                }}
                timeout={!isMobile() && is_open ? 0 : 250}
                unmountOnExit
            >
                <PlatformDropdown platform_config={platform_config} closeDrawer={closeDrawer} />
            </CSSTransition>
        </React.Fragment>
    );
};

PlatformSwitcher.propTypes = {
    platform_config: PropTypes.array,
    toggleDrawer: PropTypes.func,
};

export { PlatformSwitcher as TestedPlatformSwitcher };

export default PlatformSwitcher;
