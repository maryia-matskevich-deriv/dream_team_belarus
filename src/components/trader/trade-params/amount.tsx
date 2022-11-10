import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import { TTextValueObject } from './duration';

const Amount = () => {
    const { trade, client } = useStore();
    const { amount, basis, basis_list, onChange, currency, validation_errors } = trade;
    const { currencies_list } = client;
    const error_messages = (validation_errors as { [key: string]: string }).amount;

    const currencies_list_dropdown_options = Object.keys(currencies_list as { [key: string]: unknown }[]).reduce(
        (acc, key) => {
            const currencies: { [key: string]: string }[] = [];
            (currencies_list[key as keyof typeof currencies_list] as []).forEach(
                (currency_object: { text: string; value: string; has_tooltip: boolean }) => {
                    if (currencies.every(c => c.text !== currency_object.text)) {
                        currencies.push({
                            key: currency_object.value,
                            text: currency_object.text,
                            value: currency_object.value,
                        });
                    }
                }
            );
            return [...acc, ...currencies];
        },
        [] as { [key: string]: string }[]
    );

    const getBasisList = () => basis_list.map((item: TTextValueObject) => ({ text: item.text, value: item.value }));

    return (
        <div style={{ display: 'flex' }}>
            <Dropdown
                id='dt_amount_toggle'
                fluid
                selection
                options={getBasisList()}
                onChange={(e, { value }) => onChange({ target: { name: 'basis', value } })}
                value={basis}
            />
            <Input
                type='tel'
                onChange={(e, { value }) => {
                    onChange({
                        target: { name: 'amount', value },
                    });
                }}
                value={amount}
                error={!!error_messages?.length}
            />
            <Dropdown
                fluid
                selection
                options={currencies_list_dropdown_options}
                onChange={(e, { value }) => onChange({ target: { name: 'currency', value } })}
                value={currency}
            />
        </div>
    );
};

export default observer(Amount);
