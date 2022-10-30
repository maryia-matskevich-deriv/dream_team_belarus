import classNames from 'classnames';
import React from 'react';
import { getUrlBase } from 'utils/url';
import { TIconProps } from './icons.types';

const Icon = React.forwardRef(
    (
        {
            className,
            color,
            custom_color,
            data_testid,
            height,
            icon_path,
            id,
            onClick,
            onMouseEnter,
            onMouseLeave,
            size = 16,
            width,
        }: TIconProps,
        ref?: React.ForwardedRef<SVGSVGElement | null>
    ) => {
        if (!icon_path) return null;

        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                className={classNames('dc-icon', className, {
                    'dc-icon--active': color === 'active',
                    'dc-icon--disabled': color === 'disabled',
                    'dc-icon--green': color === 'green' || icon_path.includes('ic-profit'),
                    'dc-icon--red': color === 'red' || icon_path.includes('ic-loss'),
                    'dc-icon--secondary': color === 'secondary',
                    'dc-icon--brand': color === 'brand',
                    'dc-icon--black': color === 'black',
                    'dc-icon--orange': color === 'orange',
                })}
                data-testid={data_testid}
                height={height || size}
                id={id}
                width={width || size}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={ref}
                style={
                    (custom_color
                        ? {
                              '--fill-color1': custom_color,
                          }
                        : undefined) as React.CSSProperties & { '--fill-color1': string }
                }
            >
                <use xlinkHref={getUrlBase(`/public/${icon_path}`)} />
            </svg>
        );
    }
);

Icon.displayName = 'Icon';

export default React.memo(Icon);
