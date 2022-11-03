import React from "react";
import MarketOptions from "./market-options";

const SymbolDropdown = () => {

    // TODO: connect to store + uncomment code
// const symbol_dropdown_options = React.useMemo(
//     () =>
//         symbol_dropdown
//             .map((symbol: TSymbolItem) => ({
//                 component: <MarketOption key={symbol.text} symbol={symbol} />,
//                 ...symbol,
//             }))
//             .filter(option => option.group !== 'Cryptocurrencies'),
//     [symbol_dropdown]
// );

return (
    <>
        <MarketOptions/>
    </>
)
}

export default SymbolDropdown;