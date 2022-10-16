import React from 'react';
import styles from './multipliers.module.scss';
import PurchaseButton from '../../../purchase-button';

const Multipliers = () => {

    // ws connection, send contract, pass contracts send to bts
// implement validation



    return (
        <div>
            <div className={styles.multipliers_paramsWrapper}>
                <div>Trade Params</div>
                <div>Stake / Pay out</div>
            </div>
            <div className={styles.multipliers_buttonsWrapper}>
                <PurchaseButton />
                <PurchaseButton />
            </div>
        </div>
)
    ;
};

export default Multipliers;
