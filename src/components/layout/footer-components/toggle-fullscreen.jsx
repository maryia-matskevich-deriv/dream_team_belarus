import classNames from 'classnames';
import React from 'react';
import Popover from 'components/popover';
import { localize } from 'translations';
import IcFullScreenRestore from 'assets/icons/common/ic-full-screen-restore.svg';
import IcFullScreen from 'assets/icons/common/ic-full-screen.svg';

export const ToggleFullScreen = () => {
    const [is_full_screen, setIsFullScreen] = React.useState(false);

    const fullscreen_map = {
        event: ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'],
        element: ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'],
        fnc_enter: ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'],
        fnc_exit: ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'],
    };

    const onFullScreen = React.useCallback(() => {
        setIsFullScreen(fullscreen_map.element.some(el => document[el]));
    }, [fullscreen_map.element]);

    React.useEffect(() => {
        fullscreen_map.event.forEach(event => {
            document.addEventListener(event, onFullScreen, false);
        });
    }, [fullscreen_map.event, onFullScreen]);

    const toggleFullScreen = e => {
        e.stopPropagation();

        const to_exit = is_full_screen;
        const el = to_exit ? document : document.documentElement;
        const fncToCall = fullscreen_map[to_exit ? 'fnc_exit' : 'fnc_enter'].find(fnc => el[fnc]);

        if (fncToCall) {
            el[fncToCall]();
        } else {
            setIsFullScreen(false); // fullscreen API is not enabled
        }
    };

    const full_screen_icon_class = classNames('ic-fullscreen', 'footer__link', {
        'ic-fullscreen--active': is_full_screen,
    });
    return (
        <a className={`${full_screen_icon_class} footer__link`} onClick={toggleFullScreen} id='dt_fullscreen_toggle'>
            <Popover
                alignment='top'
                message={is_full_screen ? localize('Exit') : localize('Full screen')}
                zIndex={9999}
            >
                {is_full_screen ? (
                    <img src={IcFullScreenRestore} className='footer__icon' alt='ic-full-screen-restore'/>
                ) : (
                    <img src={IcFullScreen} className='footer__icon' alt='ic-full-screen'/>
                )}
            </Popover>
        </a>
    );
};
