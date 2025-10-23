import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...rest }) => (
<div {...rest} className={`rounded-md shadow-sm border ${className}`}>
{children}
</div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...rest }) => (
<div {...rest} className={`${className}`}>{children}</div>
);