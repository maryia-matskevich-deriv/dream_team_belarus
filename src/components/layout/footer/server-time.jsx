import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { toGMTFormat, toLocalFormat } from 'utils/date';
import Popover from 'components/popover';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

export const ServerTime = observer(({ is_mobile }) => {
    const { common } = useStore();
    const { server_time } = common;
    const gmt_time = toGMTFormat(server_time);
    const local_time = toLocalFormat(server_time);
    return (
        <Popover
            alignment='top'
            message={local_time}
            className={classNames('server-time', {
                'server-time--is-mobile': is_mobile,
            })}
            zIndex={9999}
        >
            {gmt_time}
        </Popover>
    );
});

ServerTime.propTypes = {
    is_mobile: PropTypes.bool,
};
