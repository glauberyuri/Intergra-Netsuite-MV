import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import CNPJMasked from "@/Components/CNPJMasked.jsx";

export default function SupplyCompany(companies) {
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Fornecedores</h2>}
        >
            <Head title="Fornecedores" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CD_FORNECEDOR</th>
                                    <th className="px-3 py-2">FORNECEDOR</th>
                                    <th className="px-3 py-2">CNPJ</th>
                                    <th className="px-3 py-2">ENDEREÇO</th>
                                    <th className="px-3 py-2">CIDADE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {companies.companies.data.map((item) => (
                                    <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{item.CD_FORNECEDOR}</td>
                                        <td className="px-3 py-2">{item.NM_FORNECEDOR}</td>
                                        <CNPJMasked cnpj={item.NR_CGC_CPF} className="px-3 py-2"></CNPJMasked>
                                        <td className="px-3 py-2">{item.DS_ENDERECO}</td>
                                        <td className="px-3 py-2">{item.NM_CIDADE}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={companies.companies.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
