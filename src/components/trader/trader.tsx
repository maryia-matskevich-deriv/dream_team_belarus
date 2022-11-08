import React from 'react';
import styles from './trader.module.scss';
import Multipliers from './trade-types/multipliers';
import SymbolDropdown from '../symbol-dropdown/symbol-dropdown';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import 'semantic-ui-css/semantic.min.css';

const Trader = () => {
    const [is_loading, setIsLoading] = React.useState(false);
    const { trade } = useStore();
    const { active_symbols, wsSendRequest, onMount, symbol, updateSymbol } = trade;

    React.useEffect(() => {
        onMount();
        setIsLoading(true);
        wsSendRequest({
            active_symbols: 'brief',
            product_type: 'basic',
        }).then(() => {
            setIsLoading(false);
        });
    }, []);
    // set ws connection, set symbols and types, price, pass types to types component
    //add contrct switcher

    return (
        <div className={styles.traderContainer}>
            <div className={styles.traderContainer_tradeTypes}>
                <div className={styles.traderContainer_tradeTypes_select}>
                    <SymbolDropdown
                        active_symbols={active_symbols}
                        symbol={symbol}
                        updateSymbol={updateSymbol}
                        is_loading={is_loading}
                    />
                </div>

                {/*temporary - delete after implementation*/}
                <div className={styles.traderContainer_tradeTypes_select}>Types</div>
            </div>
            {/*move Price to separate component*/}
            <div className={styles.traderContainer_price}>Price</div>
            <Multipliers />
        </div>
    );
};

export default observer(Trader);
