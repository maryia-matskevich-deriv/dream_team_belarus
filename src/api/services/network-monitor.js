import { action } from 'mobx';
import NetworkMonitorBase from '../base/network_monitor_base';
import BinarySocketGeneral from './socket-general';

let common_store;

const NetworkMonitor = (() => {
    const init = store => {
        NetworkMonitorBase.init(BinarySocketGeneral.init(store), updateStore, store.client);
        common_store = store.common;
    };

    const updateStore = action((status, is_online) => {
        if (common_store) {
            common_store.setNetworkStatus(status, is_online);
        }
    });

    return {
        init,
    };
})();

export default NetworkMonitor;
