import React from 'react';
import styles from './trader.module.scss';
import Multipliers from './trade-types/multipliers';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import 'semantic-ui-css/semantic.min.css';
import { getAssetIcon } from 'components/icon';
import { ActiveSymbols } from '@deriv/api-types';
import { Dropdown } from 'semantic-ui-react';
import { localize } from 'translations';
import { getAvailableContractTypes } from 'store/trading/Helpers/contract-type';
import { unsupported_contract_types_list } from 'utils';

const Trader = () => {
    const [is_loading, setIsLoading] = React.useState(false);
    const { trade } = useStore();
    const {
        active_symbols,
        contract_type,
        contract_types_list,
        wsSendRequest,
        onChange,
        onMount,
        symbol,
        updateSymbol,
    } = trade;

    React.useEffect(() => {
        onMount();
        setIsLoading(true);
        wsSendRequest({
            active_symbols: 'brief',
            product_type: 'basic',
        }).then(() => {
            setIsLoading(false);
        });
    }, []);
    // set ws connection, set symbols and types, price, pass types to types component
    //add contrct switcher
    const symbol_dropdown_options = React.useMemo(
        () =>
            active_symbols.map((symbol: ActiveSymbols[0] & { subgroup_display_name?: string }) => ({
                key: symbol.symbol,
                label:
                    symbol.market_display_name === 'Derived'
                        ? symbol.subgroup_display_name
                        : symbol.market_display_name,
                text: symbol.display_name,
                value: symbol.symbol,
                image: { src: getAssetIcon(symbol.symbol) },
                ...symbol,
            })),
        [active_symbols]
    );
    const trade_types_list = getAvailableContractTypes(contract_types_list, unsupported_contract_types_list);
    const contract_types_dropdown_options = trade_types_list.reduce((acc, trade_type) => {
        const contract_types: { [key: string]: string }[] = [];
        trade_type?.contract_types.forEach((contract_type: { text: string; value: string }) => {
            contract_types.push({
                key: contract_type.value,
                label: trade_type.label,
                text: contract_type.text,
                value: contract_type.value,
            });
        });
        return [...acc, ...contract_types];
    }, [] as { [key: string]: string }[]);

    return (
        <div className={styles.traderContainer}>
            <div className={styles.traderContainer_tradeTypes}>
                <div className={styles.traderContainer_tradeTypes_select}>
                    <Dropdown
                        placeholder={localize('Select symbol') as string}
                        loading={is_loading}
                        disabled={is_loading}
                        fluid
                        search
                        selection
                        options={symbol_dropdown_options}
                        className='quick-strategy__dropdown quick-strategy__leading'
                        onChange={(e, { value }) => updateSymbol(value as string)}
                        value={symbol}
                    />
                </div>

                <div className={styles.traderContainer_tradeTypes_select}>
                    <Dropdown
                        placeholder={localize('Select trade type') as string}
                        loading={is_loading}
                        disabled={is_loading}
                        fluid
                        search
                        selection
                        options={contract_types_dropdown_options as []}
                        className='quick-strategy__dropdown quick-strategy__leading'
                        onChange={(e, { value }) => onChange({ target: { value, name: 'contract_type' } })}
                        value={contract_type}
                    />
                </div>
            </div>
            {/*move Price to separate component*/}
            <div className={styles.traderContainer_price}>Price</div>
            <Multipliers />
        </div>
    );
};

export default observer(Trader);
