import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import {ITCON_PAG_STATUS_CLASS_MAP, ITCON_PAG_STATUS_PAGAMENTO} from "@/constants.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function DebitAccounts(debits) {
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pagamento Efetuado</h2>}
        >
            <Head title="Pagamento Efetuado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CD_PAGCON_PAG</th>
                                    <th className="px-3 py-2">CD_ITCON_PAG</th>
                                    <th className="px-3 py-2">VALOR RECEBIDO</th>
                                    <th className="px-3 py-2">DATA DE PAGAMENTO</th>
                                    <th className="px-3 py-2">FORNECEDOR</th>
                                </tr>
                                </thead>
                                <tbody>
                                {debits.debitAccounts.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-3 py-2 pt-4 text-center">
                                            Nenhum resultado encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    debits.debitAccounts.data.map((item) => (
                                        <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{item.cd_pagcon_pag}</td>
                                            <td className="px-3 py-2">{item.cd_itcon_pag}</td>
                                            <td className="px-3 py-2">R$ {item.vl_pago}</td>
                                            <td className="px-3 py-2">{item.dt_pagamento}</td>
                                            <td className="px-3 py-2">{item.nm_fornecedor}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            <Pagination links={debits.debitAccounts.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
