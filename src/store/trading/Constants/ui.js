import Amount from 'components/trading/amount';
import Barrier from 'components/trading/barrier';
import Duration from 'components/trading/duration';
import LastDigit from 'components/trading/last-digit';

export const form_components = [
    { name: 'duration', Component: Duration },
    { name: 'barrier', Component: Barrier },
    { name: 'last_digit', Component: LastDigit },
    { name: 'amount', Component: Amount },
];
