import React from 'react';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import { localize } from 'translations';
import { Dropdown, Input } from 'semantic-ui-react';
import { getDurationMinMaxValues, toMoment } from 'utils';

type TChangeEventObject = { target: { value: any; name?: string } };
export type TTextValueObject = { text: string; value: string };

const Duration = () => {
    const { trade, ui } = useStore();
    const { getDurationFromUnit } = ui;
    const {
        contract_expiry_type,
        duration,
        duration_min_max,
        duration_unit,
        duration_units_list,
        expiry_date,
        expiry_time,
        expiry_type,
        onChange,
        onChangeMultiple,
    } = trade;
    const [min_value, max_value] = getDurationMinMaxValues(duration_min_max, contract_expiry_type, duration_unit);

    const expiry_list: TTextValueObject[] = [{ text: localize('Duration') as string, value: 'duration' }];

    const has_end_time = expiry_list.find(expiry => expiry.value === 'endtime');
    if (duration_units_list.length === 1 && duration_unit === 't') {
        if (has_end_time) {
            expiry_list.pop(); // remove end time for contracts with only tick duration
        }
    } else if (!has_end_time) {
        expiry_list.push({ text: localize('End time') as string, value: 'endtime' });
    }

    const moment_expiry = toMoment(expiry_date as unknown as number);

    const changeDurationUnit = ({ target }: TChangeEventObject) => {
        const { value } = target;
        const duration_value = getDurationFromUnit(value);

        onChangeMultiple({
            duration_unit: value,
            duration: duration_value,
        });
    };

    const changeDurationValue = ({ target }: TChangeEventObject) => {
        const { name, value } = target;

        // e.target.value returns string, we need to convert them to number
        if (value <= max_value && value >= min_value) {
            onChange({ target: { name, value: +value } });
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Dropdown
                fluid
                selection
                options={expiry_list}
                onChange={(e, { value }) => onChange({ target: { name: 'expiry_type', value } })}
                value={expiry_type}
            />
            {expiry_type.toLowerCase() === 'duration' ? (
                <>
                    <Input type='number' name='duration' onChange={changeDurationValue} value={duration} />
                    <Dropdown
                        fluid
                        selection
                        options={duration_units_list}
                        onChange={(e, { value }) => changeDurationUnit({ target: { value } })}
                        value={duration_unit}
                    />
                </>
            ) : (
                <Input
                    type='datetime-local'
                    onChange={(e, { value }) => {
                        onChangeMultiple({
                            expiry_date: value.split('T')[0],
                            expiry_time: value.split('T')[1].slice(0, 5),
                        });
                    }}
                    value={`${
                        expiry_date ||
                        `${(moment_expiry as unknown as { format: (date: string) => void }).format('YYYY-MM-DD')}`
                    }T${expiry_time || '12:00'}`}
                />
            )}
        </div>
    );
};

export default observer(Duration);
