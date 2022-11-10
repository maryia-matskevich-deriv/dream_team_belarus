import { History, TicksHistoryRequest, TicksStreamResponse } from '@deriv/api-types';
import { WS } from 'api/services';
import Text from 'components/text';
import React from 'react';
import { Label, Loader } from 'semantic-ui-react';
import styles from './price-display.module.scss';

type TPriceDisplay = {
    symbol: string;
    wsSubscribe: (req: TicksHistoryRequest, cb: (response: TicksStreamResponse) => void) => void;
};

const PriceDisplay = ({ symbol, wsSubscribe }: TPriceDisplay) => {
    const [price, setPrice] = React.useState<number | null>(null);
    const [error, setError] = React.useState('');
    React.useEffect(() => {
        if (!WS.forgetAll) return;
        WS.forgetAll('ticks').then(() => {
            wsSubscribe(
                {
                    adjust_start_time: 1,
                    end: 'latest',
                    style: 'ticks',
                    subscribe: 1,
                    ticks_history: symbol,
                },
                (response: TicksStreamResponse & { history?: History }) => {
                    if (response.error) setError((response.error as Error).message);
                    else setPrice((response.history ? response.history.prices?.pop() : response.tick?.quote) || null);
                }
            );
        });
    }, [symbol]);

    return (
        <div className={styles.price}>
            {error ? (
                <Text size='s' weight='bold' color='red' align='center'>
                    {error}
                </Text>
            ) : (
                <>
                    <Text size='s' weight='bold' color='profit-success'>
                        {price || <Loader active inline='centered' />}
                    </Text>
                    <Label color='teal' size='big' tag>
                        Price
                    </Label>
                </>
            )}
        </div>
    );
};

export default React.memo(PriceDisplay);
