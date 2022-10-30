import React from 'react';
import { isMobile } from 'utils/screen';

const MobileWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!isMobile()) return null;

    return children;
};

export default MobileWrapper;
