/**
 * Get limit_order for contract_update API
 * @param {object} contract_update - contract_update input & checkbox values
 */
export const getLimitOrder = contract_update => {
    const {
        has_contract_update_stop_loss,
        has_contract_update_take_profit,
        contract_update_stop_loss,
        contract_update_take_profit,
        contract_info,
    } = contract_update;

    const limit_order = {};

    const new_take_profit = has_contract_update_take_profit ? +contract_update_take_profit : null;
    const has_take_profit_changed =
        Math.abs(contract_info.limit_order?.take_profit?.order_amount) !== Math.abs(new_take_profit);

    if (has_take_profit_changed) {
        // send positive take_profit to update or null cancel
        limit_order.take_profit = new_take_profit;
    }

    const new_stop_loss = has_contract_update_stop_loss ? +contract_update_stop_loss : null;
    const has_stop_loss_changed =
        Math.abs(contract_info.limit_order?.stop_loss?.order_amount) !== Math.abs(new_stop_loss);

    if (has_stop_loss_changed) {
        // send positive stop_loss to update or null to cancel
        limit_order.stop_loss = new_stop_loss;
    }

    return limit_order;
};
