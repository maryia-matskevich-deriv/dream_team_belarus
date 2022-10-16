import React from 'react';
import styles from './trader.module.scss';
import Multipliers from './trade-types/multipliers';

const Trader = () => {

    // set ws connection, set symbols and types, price, pass types to types component
//add contrct switcher

    return (
        <div className={styles.traderContainer}>
            <div className={styles.traderContainer_tradeTypes}>
                <div className={styles.traderContainer_tradeTypes_select}>Symbols</div>
                {/*temporary - delete after implementation*/}
                <div className={styles.traderContainer_tradeTypes_select}>Types</div>
            </div>
            {/*move Price to separate component*/}
            <div className={styles.traderContainer_price}>Price</div>
            <Multipliers/>
        </div>
    );
};

export default Trader;
