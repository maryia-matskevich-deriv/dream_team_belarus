import WS from 'api/services/ws-methods';
import { urlForLanguage } from '../../url';

import { getLanguage, changeLanguage as changeLanguageTranslation } from 'translations';
import SocketCache from 'api/base/socket_cache';
import BinarySocket from 'api/base/socket_base';

export const currentLanguage = getLanguage();

export const getURL = lang => urlForLanguage(lang);

export const changeLanguage = (key, changeCurrentLanguage) => {
    const request = {
        set_settings: 1,
        preferred_language: key,
    };
    SocketCache.clear();
    if (key === 'EN') {
        window.localStorage.setItem('i18n_language', key);
    }

    WS.setSettings(request).then(() => {
        const new_url = new URL(window.location.href);
        if (key === 'EN') {
            new_url.searchParams.delete('lang');
        } else {
            new_url.searchParams.set('lang', key);
        }
        window.history.pushState({ path: new_url.toString() }, '', new_url.toString());
        changeLanguageTranslation(key, () => {
            changeCurrentLanguage(key);
            BinarySocket.closeAndOpenNewConnection(key);
        });
    });
};
