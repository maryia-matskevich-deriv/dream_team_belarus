import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RootStore, StoreProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StoreProvider store={new RootStore()}>
        <App />
    </StoreProvider>
);
