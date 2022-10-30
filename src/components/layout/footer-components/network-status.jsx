import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Popover from 'components/popover';
import { localize } from 'translations';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';

const NetworkStatus = ({ is_mobile }) => {
    const { common } = useStore();
    const { network_status: status } = common;
    const network_status_element = (
        <div
            className={classNames('network-status__circle', {
                'network-status__circle--offline': status.class === 'offline',
                'network-status__circle--online': status.class === 'online',
                'network-status__circle--blinker': status.class === 'blinker',
            })}
        />
    );
    return (
        <div
            className={classNames('network-status__wrapper', {
                'network-status__wrapper--is-mobile': is_mobile,
            })}
        >
            {is_mobile ? (
                network_status_element
            ) : (
                <Popover
                    classNameBubble='network-status__tooltip'
                    alignment='top'
                    message={localize('Network status: {{status}}', {
                        status: status.tooltip || localize('Connecting to server'),
                    })}
                >
                    {network_status_element}
                </Popover>
            )}
        </div>
    );
};

NetworkStatus.propTypes = {
    is_mobile: PropTypes.bool,
    status: PropTypes.object,
};

export { NetworkStatus };

export default observer(NetworkStatus);
