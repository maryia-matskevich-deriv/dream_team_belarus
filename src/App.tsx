import React from 'react';
import Trade from 'components/trade';
import { observer } from 'mobx-react-lite';
import Header from 'components/old_layout/header';
import Footer from 'components/layout/footer.jsx';
import Page404 from './404';
import { Route, Routes } from 'react-router-dom';
import './index.scss';

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route index path={'/'} element={<Trade />} />
                <Route path={'*'} element={<Page404 />} />
            </Routes>
            <Footer/>
        </div>
    );
};

export default observer(App);
