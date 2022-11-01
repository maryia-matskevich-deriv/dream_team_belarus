import React from 'react';
import Text from 'components/text';
import { localize } from 'translations';
import IcBox from 'assets/icons/common/ic-box.svg';
import 'styles/icon.scss';

const EmptyNotification = () => (
    <div className='notifications-empty__container'>
        <div className='notifications-empty'>
            <img src={IcBox} className='notifications-empty__icon dc-icon--secondary' width={64} height={64} />
            <div className='notifications-empty__content'>
                <Text
                    as='h4'
                    size='xs'
                    weight='bold'
                    align='center'
                    color='less-prominent'
                    className='notifications-empty__header'
                >
                    {localize('No notifications')}
                </Text>
                <Text size='xxs' color='less-prominent'>
                    {localize('You have yet to receive any notifications')}
                </Text>
            </div>
        </div>
    </div>
);

export { EmptyNotification };
