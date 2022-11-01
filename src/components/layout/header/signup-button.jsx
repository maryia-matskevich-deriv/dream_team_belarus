import PropTypes from 'prop-types';
import React from 'react';
import Button from 'components/button';
import { redirectToSignUp } from 'utils';
import { localize } from 'translations';

const SignupButton = ({ className, is_appstore }) => (
    <Button
        id='dt_signup_button'
        className={className}
        has_effect
        text={localize('Sign up')}
        onClick={() => redirectToSignUp({ is_appstore })}
        primary
    />
);

SignupButton.propTypes = {
    className: PropTypes.string,
    is_appstore: PropTypes.bool,
};

export { SignupButton };
