import { makeAutoObservable } from 'mobx';
import ActiveSymbolsStore from './active-symbols-store';
import ClientStore from './client-store';
import CommonStore from './common-store';
import MenuStore from './menu-store';
import PortfolioStore from './portfolio-store';
import TradeStore from './trade-store';
import UIStore from './ui-store';
import ContractTradeStore from './contract-trade-store';

export class RootStore {
    client: ClientStore;
    common: CommonStore;
    menu: MenuStore;
    portfolio: PortfolioStore;
    ui: UIStore;
    active_symbols: ActiveSymbolsStore;
    trade: TradeStore;
    contract_trade: ContractTradeStore;

    constructor() {
        makeAutoObservable(this);
        this.client = new ClientStore(this);
        this.common = new CommonStore(this);
        this.menu = new MenuStore();
        this.portfolio = new PortfolioStore(this);
        this.ui = new UIStore(this);
        this.active_symbols = new ActiveSymbolsStore();
        this.trade = new TradeStore({ root_store: this });
        this.contract_trade = new ContractTradeStore(this);
    }

    hello = 'Hello from the root store';

    sayBye = () => {
        this.hello = 'Bye from the root store';
    };

    sayHello = async () => {
        this.hello = `Hello from the root store.`;
    };
}
