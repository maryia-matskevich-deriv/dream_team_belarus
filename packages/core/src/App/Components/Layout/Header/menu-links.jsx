import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@deriv/components';

const MenuLinks = ({ is_logged_in, items }) => (
    <React.Fragment>
        {!!items.length && (
            <div className='header__menu-links'>
                {items.map((item, idx) => {
                    const item_text = item.text();

                    return item.login_only && item.login_only !== is_logged_in ? null : (
                        <>
                            <a
                                id={item.id}
                                key={idx}
                                href={`https://app.deriv.com${item.link_to || undefined}`}
                                target='_blank'
                                className='header__menu-link'
                                active_class='header__menu-link--active'
                                rel='noreferrer'
                            >
                                <React.Fragment>
                                    {item_text && (
                                        <Text
                                            size='m'
                                            line_height='xs'
                                            title={item_text}
                                            className='header__menu-link-text'
                                        >
                                            {item_text}
                                        </Text>
                                    )}
                                </React.Fragment>
                            </a>
                            <a
                                href={`https://app.deriv.com/cashier`}
                                target='_blank'
                                className='header__menu-link'
                                active_class='header__menu-link--active'
                                rel='noreferrer'
                            >
                                <React.Fragment>
                                    <Text
                                        size='m'
                                        line_height='xs'
                                        title={'Cashier'}
                                        className='header__menu-link-text'
                                    >
                                        Cashier
                                    </Text>
                                </React.Fragment>
                            </a>
                        </>
                    );
                })}
            </div>
        )}
    </React.Fragment>
);

MenuLinks.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.shape({
                className: PropTypes.string,
            }),
            is_logged_in: PropTypes.bool,
            link_to: PropTypes.string,
            text: PropTypes.func,
        })
    ),
    is_logged_in: PropTypes.bool,
};

export { MenuLinks };
