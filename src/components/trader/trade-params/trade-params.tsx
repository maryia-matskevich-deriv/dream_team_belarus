import React from 'react';
// import Amount from 'Modules/Trading/Components/Form/TradeParams/amount.jsx';
// import Barrier from 'Modules/Trading/Components/Form/TradeParams/barrier.jsx';
// import LastDigit from 'Modules/Trading/Components/Form/TradeParams/last-digit.jsx';
// import CancelDeal from 'Modules/Trading/Components/Form/TradeParams/Multiplier/cancel-deal.jsx';
// import StopLoss from 'Modules/Trading/Components/Form/TradeParams/Multiplier/stop-loss.jsx';
// import TakeProfit from 'Modules/Trading/Components/Form/TradeParams/Multiplier/take-profit.jsx';
// import Expiration from 'Modules/Trading/Components/Form/TradeParams/Multiplier/expiration.jsx';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import Duration from './duration';

const TradeParams = () => {
    const { trade } = useStore();
    const isVisible = (component_key: string) => {
        return (trade.form_components as string[]).includes(component_key);
    };
    return (
        <React.Fragment>
            {isVisible('duration') && <Duration key={'duration'} />}
            {/* {isVisible('barrier') && <Barrier key={'barrier'} is_minimized={is_minimized} />}
            {isVisible('last_digit') && <LastDigit key={'last_digit'} is_minimized={is_minimized} />}
            {isVisible('amount') && <Amount key={'amount'} is_minimized={is_minimized} />}
            {isVisible('take_profit') && <TakeProfit key={'take_profit'} />}
            {isVisible('stop_loss') && <StopLoss key={'stop_loss'} />}
            {isVisible('cancellation') && <CancelDeal key={'cancellation'} />}
            {isVisible('expiration') && <Expiration key={'expiration'} />} */}
        </React.Fragment>
    );
};

export default observer(TradeParams);
