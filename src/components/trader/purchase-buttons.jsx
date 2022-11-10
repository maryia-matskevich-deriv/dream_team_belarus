import React from 'react';
import { isEmptyObject, getContractTypePosition } from 'utils';
import { useStore } from 'store';
import PurchaseButton from 'components/purchase-button';
import { observer } from 'mobx-react-lite';

const PurchaseButtons = () => {
    const { trade, ui } = useStore();
    const {
        contract_type,
        currency,
        is_multiplier,
        is_purchase_enabled,
        is_market_closed,
        is_trade_enabled,
        onPurchase: onClickPurchase,
        proposal_info,
        trade_types,
        validation_errors,
    } = trade;
    const { setPurchaseState } = ui;

    const is_high_low = /^high_low$/.test(contract_type.toLowerCase());
    const isLoading = info => {
        const has_validation_error = Object.values(validation_errors).some(e => e.length);
        return !has_validation_error && !info.has_error && !info.id;
    };
    const is_proposal_empty = isEmptyObject(proposal_info);

    const components = [];
    Object.keys(trade_types).map((type, index) => {
        const getSortedIndex = () => {
            if (getContractTypePosition(type) === 'top') return 0;
            if (getContractTypePosition(type) === 'bottom') return 1;
            return index;
        };
        const info = proposal_info[type] || {};
        const is_disabled = !is_trade_enabled || !info.id || !is_purchase_enabled;
        const purchase_button = (
            <PurchaseButton
                currency={currency}
                info={info}
                key={index}
                index={getSortedIndex(index, type)}
                is_disabled={is_disabled}
                is_high_low={is_high_low}
                is_loading={isLoading(info)}
                is_market_closed={is_market_closed}
                is_multiplier={is_multiplier}
                is_proposal_empty={is_proposal_empty}
                onClickPurchase={onClickPurchase}
                setPurchaseState={setPurchaseState}
                type={type}
            />
        );

        switch (getContractTypePosition(type)) {
            case 'top':
                components.unshift(purchase_button);
                break;
            case 'bottom':
                components.push(purchase_button);
                break;
            default:
                components.push(purchase_button);
                break;
        }
    });
    return components;
};

export default observer(PurchaseButtons);
