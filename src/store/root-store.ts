import { makeAutoObservable } from 'mobx';
import WS from 'api/services/ws-methods';
import ActiveSymbolsStore from './active-symbols-store';
import ClientStore from './client-store';
import CommonStore from './common-store';
import MenuStore from './menu-store';
import PortfolioStore from './portfolio-store';
import TradeStore from './trade-store';
import UIStore from './ui-store';

export class RootStore {
    client: ClientStore;
    common: CommonStore;
    menu: MenuStore;
    portfolio: PortfolioStore;
    ui: UIStore;
    active_symbols: ActiveSymbolsStore;
    trade: TradeStore;

    constructor() {
        makeAutoObservable(this);
        this.client = new ClientStore(this);
        this.common = new CommonStore(this);
        this.menu = new MenuStore();
        this.portfolio = new PortfolioStore(this);
        this.ui = new UIStore(this);
        this.active_symbols = new ActiveSymbolsStore();
        this.trade = new TradeStore({ root_store: this });
    }

    hello = 'Hello from the root store';

    sayBye = () => {
        this.hello = 'Bye from the root store';
    };

    sayHello = async () => {
        const symbols = await WS.authorized.activeSymbols((response: unknown) => {
            // eslint-disable-next-line no-console
            console.log(response, 'response');
        });
        this.hello = `Hello from the root store. Here are the active symbols: ${symbols}`;
    };
}
