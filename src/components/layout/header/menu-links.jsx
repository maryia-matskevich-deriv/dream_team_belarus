import PropTypes from 'prop-types';
import React from 'react';
import Text from 'components/text';
import { NavLink } from 'react-router-dom';

const MenuLinks = ({ is_logged_in, items }) => (
    <React.Fragment>
        {!!items.length && (
            <div className='header__menu-links'>
                {items.map((item, idx) => {
                    const item_text = item.text();

                    return item.login_only && item.login_only !== is_logged_in ? null : (
                        <a
                            key={idx}
                            href={item.link_to || item.href}
                            className='header__menu-link'
                        >
                            <React.Fragment>
                                {item_text && (
                                    <Text
                                        size='m'
                                        line_height='xs'
                                        title={item_text}
                                        className='header__menu-link-text'
                                    >
                                        {item.icon}
                                        {item_text}
                                        {item.logo}
                                    </Text>
                                )}
                            </React.Fragment>
                        </a>
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
