import { History, TicksHistoryRequest, TicksStreamResponse } from '@deriv/api-types';
import { WS } from 'api/services';
import Text from 'components/text';
import React from 'react';
import { Label, Loader } from 'semantic-ui-react';
import { addComma } from 'utils';
import styles from './price-display.module.scss';
import { usePrevious } from '../../../hooks/use-previous';
import { Icon } from 'semantic-ui-react';

type TPriceDisplay = {
    symbol: string;
    wsSubscribe: (req: TicksHistoryRequest, cb: (response: TicksStreamResponse) => void) => void;
};

const PriceDisplay = ({ symbol, wsSubscribe }: TPriceDisplay) => {
    const [price, setPrice] = React.useState('');
    const [error, setError] = React.useState('');
    const prevPrice = usePrevious(price);

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
                    else
                        setPrice(
                            response.history ? addComma(response.history.prices?.pop()) : addComma(response.tick?.quote)
                        );
                }
            );
        });
    }, [symbol]);

    if (!price) return <Loader active inline='centered' />;

    return (
        <div className={styles.price}>
            {error ? (
                <Text size='s' weight='bold' color='red' align='center'>
                    {error}
                </Text>
            ) : (
                <>
                    <Text size='m' weight='bold' color={price > prevPrice! ? 'profit-success' : 'loss-danger'}>
                        {price} <Icon name={price > prevPrice! ? 'angle up' : 'angle down'} />
                    </Text>
                    <Label color={price > prevPrice! ? 'teal' : 'red'} size='massive' tag>
                        Price
                    </Label>
                </>
            )}
        </div>
    );
};

export default React.memo(PriceDisplay);
