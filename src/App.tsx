import React from 'react';
import './index.css';
import TestTitle from './components/test-title';
import { observer } from 'mobx-react-lite';

const App = () => {
  return (
    <div>
      <TestTitle />
    </div>
  );
};

export default observer(App);
