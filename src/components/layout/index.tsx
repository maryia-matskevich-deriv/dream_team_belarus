import React, { useState } from 'react';
import AccountPopup from './account-popup';
import './_.css';

type THeader = {
  is_login?: boolean;
  currency?: any;
  accounts?: any;
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
      <div className="header-menu">
        <div className="header-menu-left">
          <div className="header-menu-platform">DTrader Air</div>
          <a
            href="https://app.deriv.com/reports/positions"
            className="header-menu-link"
          >
            Reports
          </a>
          <a href="https://app.deriv.com/cashier" className="header-menu-link">
            Cashier
          </a>
        </div>
        <div className="header-menu-right">
          {is_login ? (
            <>
              <a
                href="https://app.deriv.com/account/personal-details"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="header-menu-settings"
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  Account
                </div>
                {is_hover && (
                  <div className="header-menu-popover">
                    Manage account settings
                  </div>
                )}
              </a>
              <AccountPopup
                is_open={is_open}
                onRequestClose={onRequestClose}
                currency={currency}
                accounts={accounts}
              />
              <div onClick={() => setOpen(true)}>
                <div className={'header-menu-currency'}>
                  Currency: {currency.Demo} USD
                </div>
              </div>
              <a
                href="https://app.deriv.com/cashier/deposit"
                style={{ textDecoration: 'none' }}
              >
                <button className="header-menu-deposit">Deposit</button>
              </a>
            </>
          ) : (
            <div className="header-menu-auth">
              <button onClick={() => setLogin(true)}>toggle login</button>
              <a
                href="https://oauth.deriv.com/oauth2/authorize?app_id=16929"
                style={{ textDecoration: 'none' }}
              >
                <button className="header-menu-login">Log in</button>
              </a>
              <a
                href="https://deriv.com/signup/"
                style={{ textDecoration: 'none' }}
              >
                <button className="header-menu-signup">Sign up</button>{' '}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
