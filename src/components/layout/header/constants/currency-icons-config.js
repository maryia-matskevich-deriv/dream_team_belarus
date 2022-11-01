import IcCurrencyVirtual from 'assets/icons/currency/ic-currency-virtual.svg';
import IcCurrencyUnknown from 'assets/icons/currency/ic-currency-unknown.svg';
import IcCurrencyAud from 'assets/icons/currency/ic-currency-aud.svg';
import IcCurrencyBch from 'assets/icons/currency/ic-currency-bch.svg';
import IcCurrencyBtc from 'assets/icons/currency/ic-currency-btc.svg';
import IcCurrencyBusd from 'assets/icons/currency/ic-currency-busd.svg';
import IcCurrencyDai from 'assets/icons/currency/ic-currency-dai.svg';
import IcCurrencyEth from 'assets/icons/currency/ic-currency-eth.svg';
import IcCurrencyEur from 'assets/icons/currency/ic-currency-eur.svg';
import IcCurrencyEurs from 'assets/icons/currency/ic-currency-eurs.svg';
import IcCurrencyEusdt from 'assets/icons/currency/ic-currency-eusdt.svg';
import IcCurrencyGbp from 'assets/icons/currency/ic-currency-gbp.svg';
import IcCurrencyIdk from 'assets/icons/currency/ic-currency-idk.svg';
import IcCurrencyLtc from 'assets/icons/currency/ic-currency-ltc.svg';
import IcCurrencyPax from 'assets/icons/currency/ic-currency-pax.svg';
import IcCurrencyTusd from 'assets/icons/currency/ic-currency-tusd.svg';
import IcCurrencyTusdt from 'assets/icons/currency/ic-currency-tusdt.svg';
import IcCurrencyUsd from 'assets/icons/currency/ic-currency-usd.svg';
import IcCurrencyUsdc from 'assets/icons/currency/ic-currency-usdc.svg';
import IcCurrencyUsdk from 'assets/icons/currency/ic-currency-usdk.svg';
import IcCurrencyUst from 'assets/icons/currency/ic-currency-ust.svg';

const currency_icons_config = {
    aud: {
        icon: IcCurrencyAud
    },
    bch: {
        icon: IcCurrencyBch
    },
    btc: {
        icon: IcCurrencyBtc
    },
    busd: {
        icon: IcCurrencyBusd
    },
    dai: {
        icon: IcCurrencyDai
    },
    eth: {
        icon: IcCurrencyEth
    },
    eur: {
        icon: IcCurrencyEur
    },
    eurs: {
        icon: IcCurrencyEurs
    },
    eusdt: {
        icon: IcCurrencyEusdt
    },
    gbp: {
        icon: IcCurrencyGbp
    },
    idk: {
        icon: IcCurrencyIdk
    },
    ltc: {
        icon: IcCurrencyLtc
    },
    pax: {
        icon: IcCurrencyPax
    },
    tusd: {
        icon: IcCurrencyTusd
    },
    tusdt: {
        icon: IcCurrencyTusdt
    },
    usd: {
        icon: IcCurrencyUsd
    },
    usdc: {
        icon: IcCurrencyUsdc
    },
    usdk: {
        icon: IcCurrencyUsdk
    },
    ust: {
        icon: IcCurrencyUst
    },
}

export const getCurrencyIcon = (currency, is_virtual) => {
    if (is_virtual) return IcCurrencyVirtual;
    if (!currency || currency === 'real') return IcCurrencyUnknown;
    return currency_icons_config[currency].icon;
}