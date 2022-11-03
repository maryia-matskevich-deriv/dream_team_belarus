import React from 'react';
import {getIcon} from 'components/icon';

const MarketOption = ({ symbol }: any) => {
    console.log('getIcon', getIcon('IcUnderlying1HZ100V'));
    
    return (
        <div>
            <img src={getIcon('IcUnderlying1HZ100V')} width={32} height={32} />
            // TODO: rewrite it later
            {/* <img src={getIcon(`IcUnderlying${symbol.value}`)} width={32} height={32} /> */}
            <p>symbol name</p>
        </div>
    );
};

export default React.memo(MarketOption);