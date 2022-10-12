import React, { useState } from 'react';
import Modal from 'react-modal';
import './_.css';

const AccountPopup = ({ is_open, onRequestClose, accounts, currency }: any) => {
  const [account_type, setAccountType] = useState('Demo');
  return (
    <Modal
      isOpen={is_open}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={{
        base: 'modal-base',
        afterOpen: 'modal-base_after-open',
        beforeClose: 'modal-base_before-close',
      }}
      overlayClassName={{
        base: 'overlay-base',
        afterOpen: 'overlay-base_after-open',
        beforeClose: 'overlay-base_before-close',
      }}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={1000}
    >
      <div>
        <div className={'account-types'}>
          <div
            onClick={() => setAccountType('Demo')}
            className={'account-type'}
            style={{
              borderBottom: `${
                account_type === 'Demo' ? '2px solid red' : '2px solid grey'
              }`,
              fontWeight: `${account_type === 'Demo' ? 'bold' : 'normal'}`,
            }}
          >
            Demo
          </div>
          <div
            onClick={() => setAccountType('Real')}
            className={'account-type'}
            style={{
              borderBottom: `${
                account_type === 'Real' ? '2px solid red' : '2px solid grey'
              }`,
              fontWeight: `${account_type === 'Real' ? 'bold' : 'normal'}`,
            }}
          >
            Real
          </div>
        </div>
        <div className={'account-list'}>
          Deriv Account:
          <div className={'account-currency'}>
            <div>
              <img src={accounts.icon} alt="" width="40px" height="40px" />
              <div className={'account-currency_bold'}>{account_type}</div>
              <div className={'account-currency_small'}>
                {accounts[account_type]}
              </div>
            </div>
            <div className={'account-currency_bold'}>
              {currency[account_type]} USD
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountPopup;
