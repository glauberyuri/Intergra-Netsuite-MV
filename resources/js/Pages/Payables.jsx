import {Head, router} from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import axios from 'axios';
import {useState, useEffect} from "react";
import {CONPAG_VENCIMENTO_TEXT, ITCON_PAG_STATUS_PAGAMENTO} from "@/constants.jsx";
import { ITCON_PAG_STATUS_CLASS_MAP } from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
export default function Payables(payablesList, queryParams = null) {

    // Verifica se queryParams é definido e não é null
    queryParams = (!queryParams || typeof queryParams !== 'object' || Object.isFrozen(queryParams)) ? { ...queryParams } : queryParams;
    const searchFieldChanged = (name, value) => {
        if (value === 'T') {
            // Se o valor for 'T', navegue para a rota payables.index sem parâmetros
            router.get(route('payables.index'));
        } else if(value){
            // Caso contrário, atualize os parâmetros de consulta e navegue para a rota payables.index
            queryParams[name] = value;
            router.get(route('payables.index'), queryParams);
        }else {
            delete queryParams[name];
        }
    };
    /* DO AFTER */
    /* const [gridData, setGridData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async ()=> {
        const response = axios.get(
            "/get-payables-table"
        );
        setGridData(response.data)
    }
    console.log(gridData)*/
    /* DO AFTER */
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contas a Pagar</h2>}
        >
            <Head title="Contas a Pagar" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">FORNECEDOR</th>
                                    <th className="px-3 py-2">CONTA PREVISÃO</th>
                                    <th className="px-3 py-2">CD_ITCON_PAG</th>
                                    <th className="px-3 py-2">CD_CON_PAG</th>
                                    <th className="px-3 py-2">PARCELAS</th>
                                    <th className="px-3 py-2">VALOR</th>
                                    <th className="px-3 py-2">ACRESCIMO</th>
                                    <th className="px-3 py-2">DESCONTO</th>
                                    <th className="px-3 py-2">STATUS PAGAMENTO</th>
                                    <th className="px-3 py-2">VENCIMENTO</th>
                                </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                     <SelectInput
                                                  classname="w-full"
                                                  defaultValue={queryParams.status}
                                                  onChange={(e) =>
                                                      searchFieldChanged("status", e.target.value)
                                                  }
                                     >
                                         <option value=''></option>
                                         <option value='T'>Todos</option>
                                         <option value='Q'>Quitato</option>
                                         <option value='C'>Contas a Pagar</option>
                                         <option value='V'>Previsao</option>
                                         <option value='P'>Pacialmente</option>
                                     </SelectInput>
                                    </th>
                                    <th className="px-3 py-2"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {payablesList.payables.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="px-3 py-2 pt-4 text-center">
                                                    Nenhum resultado encontrado
                                                </td>
                                            </tr>
                                        ) : (
                                            payablesList.payables.data.map((item) => (
                                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-3 py-2">{item.nm_fornecedor}</td>
                                                    <td className="px-3 py-2">{item.cd_con_pag_previsao}</td>
                                                    <td className="px-3 py-2">{item.cd_itcon_pag}</td>
                                                    <td className="px-3 py-2">{item.cd_con_pag}</td>
                                                    <td className="px-3 py-2">{item.nr_parcela}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }} className="px-3 py-2">R$ {item.vl_duplicata}</td>
                                                    <td className="px-3 py-2">
                                                        {item.vl_acrescimo > 0 && (
                                                            <span className="px-5 py-1 rounded text-gray-500 bg-green-200">
                                                                R${item.vl_acrescimo}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {item.vl_desconto > 0 && (
                                                            <span className="px-5 py-1 rounded text-gray-500 bg-red-200">
                                                                 R${item.vl_desconto}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <span className={"px-2 py-1 rounded text-white " + ITCON_PAG_STATUS_CLASS_MAP[item.tp_quitacao]}>
                                                            {ITCON_PAG_STATUS_PAGAMENTO[item.tp_quitacao]}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-1 whitespace-no-wrap">
                                                        <span style={{ whiteSpace: 'nowrap' }} className={"px-2 py-1  rounded " + CONPAG_VENCIMENTO_TEXT[item.tp_vencimento]}>
                                                            {item.tp_quitacao === 'Q' ? '' : item.dt_vencimento}
                                                        </span>
                                                    </td>
                                                </tr>
                                      ))
                                )}
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
