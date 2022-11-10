import React from 'react';
import Money from 'components/money';
import Text from 'components/text';
import { getContractTypeDisplay, TGetSupportedContracts } from 'utils';
import { Button } from 'semantic-ui-react';

type TPurchaseButton = {
    currency: string;
    info: any;
    index: number;
    is_disabled: boolean;
    is_high_low: boolean;
    is_loading: boolean;
    is_multiplier: boolean;
    is_proposal_empty: boolean;
    onClickPurchase: (id: string, stake: string, type: string) => void;
    setPurchaseState: (index: number) => void;
    type: string;
};

const ButtonTextWrapper = ({
    is_loading,
    type,
    is_high_low,
}: Pick<TPurchaseButton, 'is_loading' | 'type' | 'is_high_low'>) => (
    <Text size='xs' weight='bold' color='colored-background' style={{ marginRight: '10px' }}>
        {is_loading ? '' : getContractTypeDisplay(type as TGetSupportedContracts, is_high_low)}
    </Text>
);

const PurchaseButton = ({
    currency,
    index,
    info,
    is_disabled,
    is_high_low,
    is_loading,
    is_multiplier,
    is_proposal_empty,
    setPurchaseState,
    onClickPurchase,
    type,
}: TPurchaseButton) => {
    const is_button_disabled = (is_disabled && !is_loading) || is_proposal_empty;

    return (
        <Button
            size='huge'
            color={index === 0 ? 'teal' : 'red'}
            disabled={is_button_disabled}
            id={`dt_purchase_${type.toLowerCase()}_button`}
            onClick={() => {
                setPurchaseState(index);
                onClickPurchase(info.id, info.stake, type);
            }}
            style={{ width: '200px' }}
        >
            <ButtonTextWrapper is_loading={is_loading} type={type} is_high_low={is_high_low} />
            {is_multiplier ? (
                <Text size='xs' weight='bold' color='colored-background'>
                    <Money amount={info.stake} currency={currency} show_currency />
                </Text>
            ) : (
                <Text size='xs' weight='bold' color='colored-background'>
                    {!(is_loading || is_disabled) ? info.returns : ''}
                </Text>
            )}
        </Button>
    );
};

export default PurchaseButton;
