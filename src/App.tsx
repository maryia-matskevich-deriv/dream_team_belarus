import React from 'react';
import './index.css';
import TestTitle from './components/test-title';
import { observer } from 'mobx-react-lite';
import Header from './components/layout';
import Trader from './components/trader';

const App = () => {
    return (
        <>
            <Header />
            <TestTitle />
            <Trader/>
        </>
    );
};

export default observer(App);
