import React, { useState, useEffect } from 'react';

const CNPJMasked = ({ cnpj }) => {
    const [formattedCNPJ, setFormattedCNPJ] = useState('');

    useEffect(() => {
        const formatCNPJ = (cnpj) => {
            if (!cnpj) return ''; // Verifica se cnpj é undefined ou null
            return cnpj.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                '$1.$2.$3/$4-$5'
            );
        };

        setFormattedCNPJ(formatCNPJ(cnpj));
    }, [cnpj]);

    return <td>{formattedCNPJ}</td>;
};

export default CNPJMasked;
