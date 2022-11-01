/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from 'hooks';
import Button from 'components/button';
import DesktopWrapper from 'components/desktop-wrapper';
import Modal from 'components/modal';
import MobileWrapper from 'components/mobile-wrapper';
import Text from 'components/text';
import { NavLink } from 'react-router-dom';
import { localize, Localize } from 'translations';
import { isEmptyObject, isMobile } from 'utils';
import { EmptyNotification } from './empty-notification.jsx';
import IcAlertInfo from 'assets/icons/common/ic-alert-info.svg';
import IcAlertAnnounce from 'assets/icons/common/ic-alert-announce.svg';
import IcAlertDanger from 'assets/icons/common/ic-alert-danger.svg';
import IcAlertSuccess from 'assets/icons/common/ic-alert-success.svg';
import IcAlertWarning from 'assets/icons/common/ic-alert-warning.svg';
import IcAlertTrustpilot from 'assets/icons/common/ic-alert-trustpilot.svg';

const alerts = {
    danger: {
        icon: IcAlertDanger,
    },
    success: {
        icon: IcAlertSuccess,
    },
    warning: {
        icon: IcAlertWarning,
    },
    trustpilot: {
        icon: IcAlertTrustpilot,
    },
};

const NotificationsList = ({ notifications = [], toggleDialog }) => {
    const getNotificationitemIcon = item => {
        const { type } = item;
        if (['contract_sold', 'info'].includes(type)) {
            return IcAlertInfo;
        } else if (type === 'p2p_completed_order') {
            return IcAlertAnnounce;
        }

        return alerts[type.toLowerCase()].icon;
    };

    return (
        <React.Fragment>
            {notifications.map(item => (
                <div className='notifications-item' key={item.key}>
                    <Text
                        as='h2'
                        className='notifications-item__title'
                        weight='bold'
                        size='xs'
                        line_height='m'
                        color='prominent'
                    >
                        {item.type && (
                            <img
                                src={getNotificationitemIcon(item)}
                                className={classNames('notifications-item__title-icon', {
                                    [`notifications-item__title-icon--${item.type}`]: item.type,
                                })}
                            />
                        )}
                        {item.header}
                    </Text>
                    <div className='notifications-item__message'>{item.message}</div>
                    <div className='notifications-item__action'>
                        {!isEmptyObject(item.action) && (
                            <React.Fragment>
                                {item.action.route ? (
                                    <NavLink
                                        onClick={toggleDialog}
                                        active_class='notifications-item'
                                        className={classNames(
                                            'dc-btn',
                                            'dc-btn--secondary',
                                            'notifications-item__cta-button'
                                        )}
                                        to={item.action.route}
                                    >
                                        <Text weight='bold' size='xxs'>
                                            {item.action.text}
                                        </Text>
                                    </NavLink>
                                ) : (
                                    <Button
                                        className={classNames('dc-btn--secondary', 'notifications-item__cta-button')}
                                        onClick={item.action.onClick}
                                    >
                                        <Text weight='bold' size='xxs'>
                                            {item.action.text}
                                        </Text>
                                    </Button>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
};
const NotificationListWrapper = React.forwardRef(({ notifications = [], toggleDialog }, ref) => {
    const is_empty = !notifications.length;
    return (
        <div className='notifications-dialog' ref={ref}>
            <div className='notifications-dialog__header'>
                <Text
                    as='h2'
                    className='notifications-dialog__header-text'
                    size='s'
                    weight='bold'
                    color='prominent'
                    styles={{
                        lineHeight: '1.6rem',
                    }}
                >
                    <Localize i18n_default_text='Notifications' />
                </Text>
            </div>
            <div
                className={classNames('notifications-dialog__content', {
                    'notifications-dialog__content--empty': is_empty,
                })}
            >
                <div style={{ overflowY: isMobile() || is_empty ? 'auto' : 'none' }}>
                    {is_empty ? (
                        <EmptyNotification />
                    ) : (
                        <NotificationsList notifications={notifications} toggleDialog={toggleDialog} />
                    )}
                </div>
            </div>
        </div>
    );
});
NotificationListWrapper.displayName = 'NotificationListWrapper';

const NotificationsDialog = ({ is_visible, notifications = [], toggleDialog }) => {
    const wrapper_ref = React.useRef();

    const handleClickOutside = event => {
        const notifications_toggle_btn = !event.target.classList.contains('notifications-toggle__icon-wrapper');
        if (!wrapper_ref.current?.contains(event.target) && is_visible && notifications_toggle_btn) {
            toggleDialog();
        }
    };

    useOnClickOutside(wrapper_ref, handleClickOutside);

    return (
        <React.Fragment>
            <MobileWrapper>
                <Modal
                    portal_element_id='modal_root'
                    title={localize('Notifications')}
                    wrapper_classname='notifications-mobile-dialog'
                    visible={is_visible}
                    onClose={toggleDialog}
                >
                    <NotificationListWrapper
                        notifications={notifications}
                        ref={wrapper_ref}
                        toggleDialog={toggleDialog}
                    />
                </Modal>
            </MobileWrapper>
            <DesktopWrapper>
                <CSSTransition
                    in={is_visible}
                    classNames={{
                        enter: 'notifications-dialog--enter',
                        enterDone: 'notifications-dialog--enter-done',
                        exit: 'notifications-dialog--exit',
                    }}
                    timeout={150}
                    unmountOnExit
                >
                    <NotificationListWrapper
                        notifications={notifications}
                        ref={wrapper_ref}
                        toggleDialog={toggleDialog}
                    />
                </CSSTransition>
            </DesktopWrapper>
        </React.Fragment>
    );
};

NotificationsDialog.propTypes = {
    is_visible: PropTypes.bool,
    notifications: PropTypes.array, // currently disabled while we don't have notifications-store
    toggleDialog: PropTypes.func,
};

export default NotificationsDialog;
