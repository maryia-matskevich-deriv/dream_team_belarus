import React from 'react';
import styles from './multipliers.module.scss';
import StakePayoutInput from '../../../stake-payout-input';
import CheckboxInput from '../../../checkbox-input';

const Multipliers = () => {
    // ws connection, send contract, pass contracts send to bts
    // implement validation

    return (
        <div className={styles.multipliers_container}>
            <div className={styles.multipliers_paramsWrapper}>
                <div>
                    <div>
                        Stake
                        <StakePayoutInput />
                    </div>
                    <div>multipliers select</div>
                </div>
                <div>
                    Trade Params
                    <CheckboxInput />
                    <CheckboxInput />
                    <CheckboxInput />
                </div>
            </div>
            <div className={styles.multipliers_buttonsWrapper}></div>
        </div>
    );
};

export default Multipliers;
