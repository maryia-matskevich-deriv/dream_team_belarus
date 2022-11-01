import React from 'react';
import PropTypes from 'prop-types';
import { getStaticUrl, PlatformContext } from 'utils';

const StaticUrl = ({ href, is_document, children, ...props }) => {
    const { is_appstore } = React.useContext(PlatformContext);

    return (
        <a href={getStaticUrl(href, { is_appstore }, is_document)} rel='noopener noreferrer' target='_blank' {...props}>
            {children}
        </a>
    );
};

StaticUrl.propTypes = {
    is_document: PropTypes.bool,
    href: PropTypes.string,
    children: PropTypes.node,
};

export default StaticUrl;
