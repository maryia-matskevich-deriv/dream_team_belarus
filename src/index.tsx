import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import initStore from 'store/initStore';
import App from './App';
import { StoreProvider } from './store';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StoreProvider store={initStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>
);
