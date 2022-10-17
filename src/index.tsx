import React from 'react';
import ReactDOM from 'react-dom/client';
import initStore from 'store/initStore';
import App from './App';
import { StoreProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StoreProvider store={initStore()}>
        <App />
    </StoreProvider>
);
