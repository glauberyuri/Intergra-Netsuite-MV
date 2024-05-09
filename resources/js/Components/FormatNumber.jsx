import React, { useEffect, useState } from 'react';

const RealMasked = ({ value }) => {
    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        const formatReal = (value) => {
            if (!value) return '';
            const floatValue = parseFloat(value);
            return floatValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        };
        setFormattedValue(formatReal(value));
    }, [value]);

    return <td>{formattedValue}</td>;
}

export default RealMasked;
