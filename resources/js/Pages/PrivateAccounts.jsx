import {Head, router} from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {
    CONPAG_VENCIMENTO_TEXT,
    ITCON_PAG_STATUS_PAGAMENTO, ITCON_PAG_STATUS_RECEBER,
    ITCON_REC_TIPO_CONTA_CLASS,
    ITCON_REC_TIPO_CONTA_STATUS, ITCONREC_REC_STATUS_CLASS_MAP
} from "@/constants.jsx";
import { ITCON_PAG_STATUS_CLASS_MAP } from "@/constants.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SelectInput from "@/Components/SelectInput.jsx";
export default function PrivateAccounts(privateslist, queryParams = null) {
    // Verifica se queryParams é definido e não é null
    queryParams = (!queryParams || typeof queryParams !== 'object' || Object.isFrozen(queryParams)) ? { ...queryParams } : queryParams;
    const searchFieldChanged = (name, value) => {
        if (value === 'T') {
            // Se o valor for 'T', navegue para a rota private.index sem parâmetros
            router.get(route('private.index'));
        } else if(value){
            // Caso contrário, atualize os parâmetros de consulta e navegue para a rota private.index
            queryParams[name] = value;
            router.get(route('private.index'), queryParams);
        }else{
            delete queryParams[name];
        }
    };
/*
    const [gridData, setGridData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async ()=> {
        const response = axios.get(
            "/get-private-table"
        );
        setGridData(response.data)
        console.log(gridData)

    }
*/
    console.log(privateslist)

    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contas a Receber</h2>}
        >
            <Head title="Contas a Receber" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CODIGO</th>
                                    <th className="px-3 py-2">PARCELA</th>
                                    <th className="px-3 py-2">EMISSAO</th>
                                    <th className="px-3 py-2">STATUS RECEBIMENTO</th>
                                    <th className="px-3 py-2">VENCIMENTO</th>
                                    <th className="px-3 py-2">VALOR PAGAMENTO</th>
                                    <th className="px-3 py-2">TIPO</th>
                                    <th className="px-3 py-2">CLIENTE</th>
                                </tr>
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <SelectInput
                                            classname="w-full"
                                            defaultValue={queryParams.statusT}
                                            onChange={(e) =>
                                                searchFieldChanged("statusTipo", e.target.value)
                                            }
                                        >
                                            <option value=''></option>
                                            <option value='T'>Todos</option>
                                            <option value='P'>CONTA PACIENTE</option>
                                            <option value='C'>CONVENIO</option>
                                            <option value='D'>DIVERSOS</option>
                                            <option value='F'>FUNCIONARIO</option>
                                            <option value='M'>MENSALIDADE</option>
                                            <option value='R'>FARMACIA</option>
                                        </SelectInput>
                                    </th>
                                    <th className="px-3 py-2"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {privateslist.privates.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-3 py-2 pt-4 text-center">
                                                Nenhum resultado encontrado
                                            </td>
                                        </tr>
                                    ) : (
                                    privateslist.privates.data.map((item) => (
                                    <tr key={item.CD_ITCON_REC} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{item.CD_ITCON_REC}</td>
                                        <td className="px-3 py-2">{item.NR_PARCELA}</td>
                                        <td className="px-3 py-2">{item.DT_EMISSAO}</td>
                                        <td className="px-3 py-2">
                                            <span
                                                className={"px-2 py-1 inline-block w-36 rounded text-center  text-white " + ITCONREC_REC_STATUS_CLASS_MAP[item.tp_quitacao]}
                                            >
                                                {ITCON_PAG_STATUS_RECEBER[item.tp_quitacao]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">{item.tp_quitacao === 'Q' ? '' : item.DT_VENCIMENTO}</td>
                                        <td className="px-3 py-2">R$ {item.VL_DUPLICATA}</td>
                                        <td className="px-3 py-2">
                                            <span
                                                className={"px-2 py-1 inline-block w-36 rounded text-center text-white " + ITCON_REC_TIPO_CONTA_CLASS[item.tp_con_rec]}
                                            >
                                                {ITCON_REC_TIPO_CONTA_STATUS[item.tp_con_rec]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">{item.NM_CLIENTE}</td>
                                    </tr>
                                ))
                                )}
                                </tbody>
                            </table>
                            <Pagination links={privateslist.privates.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
