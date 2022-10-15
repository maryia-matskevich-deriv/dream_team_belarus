import React, { useState } from 'react';
import AccountPopup from './account-popup';
import styles from './layout.module.css';

type THeader = {
    is_login?: boolean;
    currency?: Record<'Demo' | 'Real', number>;
    accounts?: Record<'Demo' | 'Real' | 'icon', string>;
};
type THeaderLinks = { layer: string; link: string; style?: string }[];
type THeaderContent = { left_side: THeaderLinks; right_side: THeaderLinks };

const header_links: THeaderContent = {
    left_side: [
        { layer: 'Reports', link: 'https://app.deriv.com/reports/positions' },
        { layer: 'Cashier', link: 'https://app.deriv.com/cashier' },
    ],
    right_side: [
        {
            layer: 'Log in',
            link: 'https://oauth.deriv.com/oauth2/authorize?app_id=16929',
            style: styles.headerLogin,
        },
        {
            layer: 'Sign up',
            link: 'https://deriv.com/signup/',
            style: styles.headerSignup,
        },
    ],
};

const Header = ({
    accounts = {
        Demo: 'VRTC124124',
        Real: 'CR214124',
        icon: 'public/images/demo-currency.svg',
    },
    currency = { Demo: 10000, Real: 100 },
}: THeader) => {
    const [is_open, setOpen] = useState(false);
    const [is_hover, setHover] = useState(false);
    const [is_login, setLogin] = useState(false);

    const onRequestClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.headerPlatform}>DTrader Air</div>
                    {header_links.left_side.map(({ layer, link }) => (
                        <a key={layer} href={link} className={styles.headerLink}>
                            {layer}
                        </a>
                    ))}
                </div>
                <div className={styles.headerRight}>
                    {is_login ? (
                        <>
                            <a href='https://app.deriv.com/account/personal-details' style={{ textDecoration: 'none' }}>
                                <div
                                    className={styles.headerSettings}
                                    onMouseOver={() => setHover(true)}
                                    onMouseOut={() => setHover(false)}
                                >
                                    Account
                                </div>
                                {is_hover && <div className={styles.headerPopover}>Manage account settings</div>}
                            </a>
                            <AccountPopup
                                is_open={is_open}
                                onRequestClose={onRequestClose}
                                currency={currency}
                                accounts={accounts}
                            />
                            <div onClick={() => setOpen(true)}>
                                <div className={styles.headerCurrency}>Currency: {currency.Demo} USD</div>
                            </div>
                            <a href='https://app.deriv.com/cashier/deposit' style={{ textDecoration: 'none' }}>
                                <button className={styles.headerDeposit}>Deposit</button>
                            </a>
                        </>
                    ) : (
                        <div className={styles.headerAuth}>
                            <button onClick={() => setLogin(true)}>toggle login</button>
                            {header_links.right_side.map(({ layer, link, style }) => (
                                <a key={layer} href={link} style={{ textDecoration: 'none' }}>
                                    <button className={style}>{layer}</button>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
