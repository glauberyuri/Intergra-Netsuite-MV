import react, {useEffect, useState} from 'react';

const CPFMasked = ({cpf}) => {
    const [formattedCPF, setFormattedCPF] = useState('');

    useEffect(() =>{
        const formatCPF = (cpf) => {
            if(!cpf) return '';
            return cpf.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                '$1.$2.$3-$4'
            );
        };
        setFormattedCPF(formatCPF(cpf));
    },[cpf]);

    return <td>{formattedCPF}</td>;
}

export default CPFMasked;
