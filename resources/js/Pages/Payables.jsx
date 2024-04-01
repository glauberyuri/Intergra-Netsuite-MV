import { Head } from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import axios from 'axios';
import {useState, useEffect} from "react";
import {CONPAG_VENCIMENTO_TEXT, ITCON_PAG_STATUS_PAGAMENTO} from "@/constants.jsx";
import { ITCON_PAG_STATUS_CLASS_MAP } from "@/constants.jsx";
export default function Payables(payablesList) {
    /* DO AFTER */
    const [gridData, setGridData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async ()=> {
        const response = axios.get(
            "/get-payables-table"
        );
        setGridData(response.data)
    }
    console.log(gridData)
    /* DO AFTER */
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contas a Pagar</h2>}
        >
            <Head title="Contas a Pagar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">FORNECEDOR</th>
                                    <th className="px-3 py-2">CD_ITCON_PAG</th>
                                    <th className="px-3 py-2">CD_CON_PAG</th>
                                    <th className="px-3 py-2">VALOR</th>
                                    <th className="px-3 py-2">STATUS PAGAMENTO</th>
                                    <th className="px-3 py-2">VENCIMENTO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {payablesList.payables.data.map((item) => (
                                    <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{item.nm_fornecedor}</td>
                                        <td className="px-3 py-2">{item.cd_itcon_pag}</td>
                                        <td className="px-3 py-2">{item.cd_con_pag}</td>
                                        <td className="px-3 py-2">R$ {item.vl_duplicata}</td>
                                        <td className="px-3 py-2">
                                            <span
                                               className={"px-2 py-1 rounded text-white " + ITCON_PAG_STATUS_CLASS_MAP[item.tp_quitacao]}
                                            >
                                                {ITCON_PAG_STATUS_PAGAMENTO[item.tp_quitacao]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">
                                              <span className={"px-2 py-1 rounded " +  CONPAG_VENCIMENTO_TEXT[item.tp_vencimento]}>
                                                {item.tp_quitacao === 'Q' ? '' : item.dt_vencimento}
                                             </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={payablesList.payables.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
