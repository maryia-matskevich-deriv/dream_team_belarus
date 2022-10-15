import React from 'react';
import './index.css';
import TestTitle from './components/test-title';
import { observer } from 'mobx-react-lite';
import Header from './components/layout';

const App = () => {
  return (
    <>
      <Header />
      <TestTitle />
    </>
  );
};

export default observer(App);
