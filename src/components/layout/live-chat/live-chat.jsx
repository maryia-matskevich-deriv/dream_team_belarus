import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Popover from 'components/popover';
import './live-chat.scss';
import { deriv_urls } from 'utils';
import { localize } from 'translations';
import { liveChatInitialization } from './live-chat';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import IcLiveChat from 'assets/icons/common/ic-live-chat.svg';

const LiveChat = ({ is_mobile_drawer }) => {
    const { client } = useStore();
    const { has_cookie_account } = client;
    const [is_livechat_interactive, setLiveChatInteractive] = React.useState(false);
    const [reload, setReload] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        handleHistoryChange();
    }, [location]);

    React.useEffect(() => {
        if (window.LiveChatWidget) {
            window.LiveChatWidget.on('ready', () => {
                setLiveChatInteractive(true);
            });
        }
    }, []);

    React.useEffect(() => {
        if (has_cookie_account) {
            liveChatSetup(true);
        } else {
            liveChatSetup(false);
        }
    }, [has_cookie_account]);

    React.useEffect(() => {
        if (reload === true) {
            if (has_cookie_account) {
                liveChatSetup(true);
            } else {
                liveChatSetup(false);
            }
            setReload(false);
        }
    }, [reload]);

    const liveChatSetup = is_logged_in => {
        if (window.LiveChatWidget) {
            window.LiveChatWidget.on('ready', () => {
                let client_first_name = '';
                let client_last_name = '';
                const domain = /^(.)*deriv\.(com|me)$/gi.test(window.location.hostname)
                    ? deriv_urls.DERIV_HOST_NAME
                    : 'binary.sx';
                const client_information = Cookies.get('client_information', {
                    domain,
                });
                const utm_data = Cookies.get('utm_data', { domain });

                const { utm_source, utm_medium, utm_campaign } = utm_data || {};

                const { loginid, email, landing_company_shortcode, currency, residence, first_name, last_name } =
                    client_information || {};

                client_first_name = first_name ?? ' ';
                client_last_name = last_name ?? ' ';

                /* the session variables are sent to CS team dashboard to notify user has logged in
                and also acts as custom variables to trigger targeted engagement */
                if (window.LiveChatWidget) {
                    const session_variables = {
                        is_logged_in: !!is_logged_in,
                        loginid: loginid ?? ' ',
                        landing_company_shortcode: landing_company_shortcode ?? ' ',
                        currency: currency ?? ' ',
                        residence: residence ?? ' ',
                        email: email ?? ' ',
                        utm_source: utm_source ?? ' ',
                        utm_medium: utm_medium ?? ' ',
                        utm_campaign: utm_campaign ?? ' ',
                    };
                    window.LiveChatWidget.call('set_session_variables', session_variables);

                    if (is_logged_in) {
                        // client logged in
                        // prepfill name and email
                        window.LiveChatWidget.call('set_customer_email', session_variables.email);
                        window.LiveChatWidget.call('set_customer_name', `${client_first_name} ${client_last_name}`);

                        // prefill name and email fields after chat has ended
                        window.LC_API.on_chat_ended = () => {
                            window.LiveChatWidget.call('set_customer_email', session_variables.email);
                            window.LiveChatWidget.call('set_customer_name', `${client_first_name} ${client_last_name}`);
                        };
                    } else {
                        // client not logged in
                        // clear name and email fields
                        window.LiveChatWidget.call('set_customer_email', ' ');
                        window.LiveChatWidget.call('set_customer_name', ' ');
                        // clear name and email fields after chat has ended
                        window.LC_API.on_chat_ended = () => {
                            window.LiveChatWidget.call('set_customer_email', ' ');
                            window.LiveChatWidget.call('set_customer_name', ' ');
                        };
                    }
                }
            });
        }
    };

    const livechatDeletion = () =>
        new Promise(resolve => {
            if (window.LiveChatWidget) {
                window.LiveChatWidget.on('ready', () => {
                    try {
                        if (window.LiveChatWidget.get('customer_data').status !== 'chatting') {
                            window.LiveChatWidget.call('destroy');
                            resolve();
                        }
                    } catch (e) {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });

    const handleHistoryChange = () => {
        livechatDeletion().then(() => {
            liveChatInitialization().then(() => {
                setReload(true);
                setLiveChatInteractive(true);
                setReload(false);
            });
        });
    };

    return (
        <React.Fragment>
            {is_livechat_interactive && (
                <React.Fragment>
                    {is_mobile_drawer ? (
                        <div
                            className='livechat gtm-deriv-livechat'
                            onClick={() => {
                                window.LiveChatWidget?.call('maximize');
                            }}
                        >
                            <div className='livechat__icon-wrapper'>
                                <img src={IcLiveChat} className='livechat__icon' alt='ic-live-chat' />
                            </div>
                            <p className='livechat__title'>{localize('Live chat')}</p>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                window.LiveChatWidget?.call('maximize');
                            }}
                        >
                            <Popover
                                className='footer__link'
                                classNameBubble='help-centre__tooltip'
                                alignment='top'
                                message={localize('Live chat')}
                                zIndex={9999}
                            >
                                <img src={IcLiveChat} className='footer__icon gtm-deriv-livechat' alt='ic-live-chat' />
                            </Popover>
                        </div>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

LiveChat.propTypes = {
    is_mobile_drawer: PropTypes.bool,
};

export default observer(LiveChat);
