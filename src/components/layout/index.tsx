import React, { useState } from 'react';
import { Account, Platform } from './components';
import { handleLogIn, handleSignUp } from './utils';

type THeader = {
  is_login?: boolean
}

 const Header = ({is_login = false}: THeader) => {
  const [is_open, setIsOpen] = useState(false);

  return (
    <>
      <>
        <Platform />
        <a href='reports'>Reports</a>
        <a href='cashier'>Cashier</a>
      </>
      {is_login ? 
      <>
        <div onClick={() => setIsOpen(!is_open)}>
          <a href='accountsettings'>
            <img src='' alt='' />
            Account
            {is_open && 
            <>
              Account settings
            </>}
          </a>   
        </div> 
        <Account />
        <button>
          <a href='deposit'>
            Deposit
          </a>
        </button>
      </>
      : 
      <>
        <div onClick={handleLogIn}>Log In</div>
        <div onClick={handleSignUp}>Sign up</div>
      </>}
      
    </>
  );
}

export default Header
