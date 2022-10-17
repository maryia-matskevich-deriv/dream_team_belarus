import { WS } from '../api/services';
import { makeAutoObservable, runInAction } from 'mobx';
import BaseStore from './base-store';

export default class ActiveSymbolsStore extends BaseStore {
    constructor() {
        super();
        makeAutoObservable(this);
    }

    active_symbols = [];

    setActiveSymbols = async () => {
        const { active_symbols, error } = await WS.authorized.activeSymbols();
        runInAction(() => {
            if (!active_symbols.length || error) {
                this.active_symbols = [];
                return;
            }
            this.active_symbols = active_symbols;
        });
    }
}
