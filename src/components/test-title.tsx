import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

const TestTitle = () => {
  const store = useStore();

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '300px' }}>{store.hello}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          columnGap: '30px',
        }}
      >
        <button onClick={store.sayBye}>Say bye</button>
        <button onClick={store.sayHello}>Say Hello</button>
      </div>
    </div>
  );
};

export default observer(TestTitle);
