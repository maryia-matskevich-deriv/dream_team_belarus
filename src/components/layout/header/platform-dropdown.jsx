import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { useOnClickOutside } from 'hooks';
import { isDesktop, isMobile, routes } from 'utils';
import 'styles/platform-dropdown.scss';
import { NavLink } from 'react-router-dom';

const PlatformBox = ({ platform: { icon, title, description } }) => (
    <>
        <div className='platform-dropdown__list-platform-background' />
        <img className='platform-dropdown__list-platform-icon' src={icon} width={32} height={32} />

        <div className='platform-dropdown__list-platform-details'>
            <p className='platform-dropdown__list-platform-title'>{title()}</p>
            <p className='platform-dropdown__list-platform-description'>{description()}</p>
        </div>
    </>
);

PlatformBox.propTypes = {
    platform: PropTypes.object,
};

const PlatformDropdown = ({ closeDrawer, platform_config }) => {
    React.useEffect(() => {
        window.addEventListener('popstate', closeDrawer);

        return () => {
            window.removeEventListener('popstate', closeDrawer);
        };
    }, [closeDrawer]);

    const ref = React.useRef();

    const handleClickOutside = event => {
        if (!event.target.closest('.platform-dropdown__list') && !event.target.closest('.platform-switcher')) {
            closeDrawer();
        }
    };

    useOnClickOutside(ref, handleClickOutside, () => isDesktop());

    const platform_dropdown = (
        <div className='platform-dropdown'>
            <div className='platform-dropdown__list'>
                {platform_config.map((platform, idx) => (
                    <div key={idx} onClick={closeDrawer} ref={ref}>
                        {platform.link_to ? (
                            <NavLink
                                to={platform.link_to}
                                // This is here because in routes-config it needs to have children, but not in menu
                                exact={`${platform.link_to === routes.trade}`}
                                className='platform-dropdown__list-platform'
                            >
                                <PlatformBox platform={platform} />
                            </NavLink>
                        ) : (
                            <a href={platform.href} className='platform-dropdown__list-platform'>
                                <PlatformBox platform={platform} />
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    if (isMobile()) {
        return ReactDOM.createPortal(platform_dropdown, document.getElementById('mobile_platform_switcher'));
    }

    return ReactDOM.createPortal(platform_dropdown, document.getElementById('root'));
};

PlatformDropdown.propTypes = {
    platform_config: PropTypes.array,
};

export { PlatformDropdown, PlatformBox };
