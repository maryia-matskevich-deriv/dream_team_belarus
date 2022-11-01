/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React from 'react';
import Counter from 'components/counter';
import DesktopWrapper from 'components/desktop-wrapper';
import MobileWrapper from 'components/mobile-wrapper';
import Popover from 'components/popover';
import NotificationsDialog from './notifications-dialog.jsx';
import 'styles/notifications-dialog.scss';
import IcBell from 'assets/icons/common/ic-bell.svg';

const ToggleNotificationsDrawer = ({
    count,
    is_visible,
    toggleDialog,
    tooltip_message,
    should_disable_pointer_events = false,
}) => {
    const notifications_toggler_el = (
        <div
            className={classNames('notifications-toggle__icon-wrapper', {
                'notifications-toggle__icon-wrapper--active': is_visible,
            })}
            onClick={toggleDialog}
        >
            <img className='notifications-toggle__icon' src={IcBell} />
            {!!count && <Counter count={count} className='notifications-toggle__step' />}
        </div>
    );

    return (
        <div
            className={classNames('notifications-toggle', {
                'notifications-toggle--active': is_visible,
            })}
        >
            <DesktopWrapper>
                <Popover
                    classNameBubble='notifications-toggle__tooltip'
                    alignment='bottom'
                    message={tooltip_message}
                    should_disable_pointer_events={should_disable_pointer_events}
                    zIndex={9999}
                >
                    {notifications_toggler_el}
                </Popover>
                <NotificationsDialog is_visible={is_visible} toggleDialog={toggleDialog} />
            </DesktopWrapper>
            <MobileWrapper>
                {notifications_toggler_el}
                <NotificationsDialog is_visible={is_visible} toggleDialog={toggleDialog} />
            </MobileWrapper>
        </div>
    );
};

export default ToggleNotificationsDrawer;
