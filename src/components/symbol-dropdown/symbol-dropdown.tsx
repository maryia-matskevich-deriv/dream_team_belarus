import React from 'react';
import { ActiveSymbols } from '@deriv/api-types';
import { getIcon } from 'components/icon';
import { localize } from 'translations';
import 'styles/quick-strategy.scss';
import { Dropdown } from 'semantic-ui-react';

type TSymbolDropdown = {
    active_symbols: ActiveSymbols;
    is_loading: boolean;
    symbol: string;
    updateSymbol: (symbol: string) => void;
};

const SymbolDropdown = ({ active_symbols, is_loading, symbol, updateSymbol }: TSymbolDropdown) => {
    const symbol_dropdown_options = React.useMemo(
        () =>
            active_symbols.map((symbol: ActiveSymbols[0]) => ({
                key: symbol.symbol,
                text: symbol.display_name,
                value: symbol.symbol,
                image: { src: getIcon(symbol.symbol) },
                ...symbol,
            })),
        [active_symbols]
    );

    return (
        <Dropdown
            placeholder={localize('Select symbol') as string}
            loading={is_loading}
            fluid
            search
            selection
            options={symbol_dropdown_options}
            className='quick-strategy__dropdown quick-strategy__leading'
            onChange={(e, { value }) => updateSymbol(value as string)}
            value={symbol}
        />
    );
};

export default React.memo(SymbolDropdown);
