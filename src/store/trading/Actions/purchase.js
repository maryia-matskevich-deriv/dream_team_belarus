import { WS } from 'api/services';

export const processPurchase = async (proposal_id, price, passthrough) =>
    WS.buy({
        proposal_id,
        price,
        ...(passthrough && { passthrough }),
    });
