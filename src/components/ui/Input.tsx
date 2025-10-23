import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...rest }) => (
<input {...rest} className={`rounded-md px-3 py-2 border ${className}`} />
);