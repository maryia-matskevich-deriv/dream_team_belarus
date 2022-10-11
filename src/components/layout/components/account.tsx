import * as React from 'react';

type TAccount = {
  currency?: number
}

 const Account = ({currency = 10000}: TAccount) => {
  return (
    <div>
      <img src='public/images/air.jpg' alt='air' width='40' height='40'/>
      <div>Currency: {currency} USD</div>
    </div>
  );
}

export default Account
