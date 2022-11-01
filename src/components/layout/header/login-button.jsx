import PropTypes from 'prop-types';
import React from 'react';
import Button from 'components/button';
import { redirectToLogin } from 'utils';
import { getLanguage, localize } from 'translations';

const LoginButton = ({ className }) => (
    <Button
        id='dt_login_button'
        className={className}
        has_effect
        text={localize('Log in')}
        onClick={() => redirectToLogin(false, getLanguage())}
        tertiary
    />
);

LoginButton.propTypes = {
    className: PropTypes.string,
};

export { LoginButton };
