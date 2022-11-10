import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';

const Amount = () => {
    const { trade, client } = useStore();
    const {
        onChange,
        currency,
        basis,
    } = trade;
    const { currencies_list } = client;
    console.log('currencies_list', currencies_list);
    

    return (
        <div style={{ display: 'flex' }}>
            <Input 
                label='Stake' 
                type='number' 
                name='basis' 
                onChange={(e, { value }) => {
                    onChange({
                        target: { value: value, name: 'basis' }
                    });
                }}
                value={`${basis}`} 
            />
            <Dropdown
                fluid
                selection
                options={(currencies_list as {Fiat: any[]})?.Fiat}
                onChange={(e, { value }) => onChange({ target: { name: 'expiry_type', value } })}
                value={currency}
            />
        </div>
    );
};

export default observer(Amount);
