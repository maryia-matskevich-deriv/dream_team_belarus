import React from 'react';
import { action, observable, makeObservable } from 'mobx';
import IcReports from 'assets/icons/common/ic-reports.svg';
import IcCashier from 'assets/icons/cashier/ic-cashier.svg';
import { localize } from 'translations';
import BaseStore from './base-store';
import { urlForDeriv } from 'utils';

export default class MenuStore extends BaseStore {
    extensions = [
        {
            id: 'dt_reports_tab',
            icon: <img src={IcReports} className='header__icon' />,
            text: () => localize('Reports'),
            link_to: urlForDeriv('reports', `ext_platform_url=${encodeURIComponent(window.location.href)}`),
            login_only: true,
        },
        {
            id: 'dt_cashier_tab',
            icon: <img src={IcCashier} className='header__icon' />,
            text: () => localize('Cashier'),
            href: urlForDeriv('cashier', `ext_platform_url=${encodeURIComponent(window.location.href)}`),
            login_only: true,
        },
    ];

    constructor() {
        // TODO: [mobx-undecorate] verify the constructor arguments and the arguments of this automatically generated super call
        super();

        makeObservable(this, {
            extensions: observable,
            attach: action.bound,
            detach: action.bound,
        });
    }

    attach(menu) {
        if (!(menu instanceof Object)) {
            throw new TypeError('Menu is not an instance of object.');
        }
        this.extensions.push(menu);
    }

    update(menu, index) {
        if (this.extensions[index]) {
            this.extensions[index] = menu;
        }
    }

    detach(menu) {
        this.extensions = this.extensions.filter(extension => extension.id !== menu);
    }
}
