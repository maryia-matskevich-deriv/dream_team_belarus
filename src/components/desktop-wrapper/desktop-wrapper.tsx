import { isDesktop } from 'utils';

const Desktop = ({ children }: { children: React.ReactNode }) => {
    if (!isDesktop()) return null;
    return children;
};

export default Desktop;
