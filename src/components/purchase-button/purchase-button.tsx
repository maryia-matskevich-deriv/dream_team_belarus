import React from 'react';
import { Button } from 'semantic-ui-react';

type TPurchaseButton = {
    onPurchase?: (proposal_id: string, price: string, type: string) => void;
    info?: any;
    my_type?: any;
};

const PurchaseButton = ({ onPurchase, info, my_type }: TPurchaseButton) => {
    // TODO implement styles, disable

    const isDisabled = info === undefined;

    const btn_name = my_type || 'Purchase button';

    const handleClick = () => {
        if (onPurchase) {
            onPurchase(info.id, info.stake, my_type);
        }
    };

    return (
        <div>
            <Button size='massive' color='teal' onClick={handleClick} disabled={isDisabled}>
                {btn_name}
            </Button>
        </div>
    );
};

export default PurchaseButton;
