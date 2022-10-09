import { makeAutoObservable } from "mobx";

export class RootStore {
    constructor(){
        makeAutoObservable(this)
    }

    hello = 'Hello from the root store'

    sayBye = () => {
        this.hello = 'Bye from the root store'
    }

    sayHello = () => {
        this.hello = 'Hello from the root store'
    }
}