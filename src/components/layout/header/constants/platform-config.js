import { routes, getPlatformSettings, platforms_icons } from 'utils';
import { localize } from 'translations';

const platform_config = [
    {
        icon: platforms_icons.deriv_air,
        title: () => getPlatformSettings('deriv_air').name,
        name: getPlatformSettings('deriv_air').name,
        description: () => localize('Trading is in the air...'),
        link_to: routes.deriv_air,
    },
    {
        icon: platforms_icons.trader,
        title: () => getPlatformSettings('trader').name,
        name: getPlatformSettings('trader').name,
        description: () => localize('A whole new trading experience on a powerful yet easy to use platform.'),
        href: routes.trade,
    },
    {
        icon: platforms_icons.dbot,
        title: () => getPlatformSettings('dbot').name,
        name: getPlatformSettings('dbot').name,
        description: () => localize('Automated trading at your fingertips. No coding needed.'),
        href: routes.bot,
    },
    {
        icon: platforms_icons.mt5,
        title: () => getPlatformSettings('mt5').name,
        name: getPlatformSettings('mt5').name,
        description: () => localize('Trade on Deriv MT5 (DMT5), the all-in-one FX and CFD trading platform.'),
        href: routes.mt5,
    },
    {
        icon: platforms_icons.dxtrade,
        title: () => getPlatformSettings('dxtrade').name,
        name: getPlatformSettings('dxtrade').name,
        description: () => localize('Trade CFDs on a customizable, easy-to-use trading platform.'),
        href: routes.dxtrade,
    },
    {
        icon: platforms_icons.smarttrader,
        title: () => getPlatformSettings('smarttrader').name,
        name: getPlatformSettings('smarttrader').name,
        description: () => localize('Trade the world’s markets with our popular user-friendly platform.'),
        href: routes.smarttrader,
    },
    {
        icon: platforms_icons.bbot,
        title: () => getPlatformSettings('bbot').name,
        name: getPlatformSettings('bbot').name,
        description: () =>
            localize(
                'Our classic “drag-and-drop” tool for creating trading bots, featuring pop-up trading charts, for advanced users.'
            ),
        href: routes.binarybot,
    },
];

export default platform_config;
