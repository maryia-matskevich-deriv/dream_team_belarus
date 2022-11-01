import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'components/modal';
import { AccountSwitcher } from './account-switcher.jsx';

const AccountSwitcherMobile = props => {
    const { disableApp, enableApp, is_visible, toggle } = props;
    return (
        <Modal
            id='dt_account_switcher_modal'
            className='accounts-switcher'
            enableApp={enableApp}
            is_open={is_visible}
            is_vertical_top
            disableApp={disableApp}
            has_close_icon={false}
            toggleModal={toggle}
            height='auto'
            width='calc(100vw - 32px)'
        >
            <div className={classNames('acc-switcher__wrapper', 'acc-switcher__wrapper--is-mobile')}>
                <AccountSwitcher is_mobile is_visible={true} toggle={toggle} />
            </div>
        </Modal>
    );
};

AccountSwitcherMobile.propTypes = {
    children: PropTypes.any,
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    is_visible: PropTypes.bool,
    is_upgrade_enabled: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    toggle: PropTypes.func,
    visible: PropTypes.bool,
    wrapperClassName: PropTypes.string,
};

export default AccountSwitcherMobile;
