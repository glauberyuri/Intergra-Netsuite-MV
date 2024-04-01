import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import CPFMasked from "@/Components/CPFMasked.jsx";

export default function FinanceManager(finances) {
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Responsavel Financeiro</h2>}
        >
            <Head title="Responsavel Financeiro" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CD_RESPONSAVEL</th>
                                    <th className="px-3 py-2">RESPONSAVEL</th>
                                    <th className="px-3 py-2">CPF</th>
                                    <th className="px-3 py-2">ENDEREÇO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {finances.finances.data.map((item) => (
                                    <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{item.CD_RESPONSAVEL}</td>
                                        <td className="px-3 py-2">{item.NM_RESPONSAVEL}</td>
                                        <CPFMasked cpf={item.NR_CPF} className="px-3 py-2"></CPFMasked>
                                        <td className="px-3 py-2">{item.DS_ENDERECO}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={finances.finances.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
