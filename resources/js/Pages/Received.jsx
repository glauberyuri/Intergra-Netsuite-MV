import { Head } from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {
    CONPAG_VENCIMENTO_TEXT,
    ITCON_PAG_STATUS_PAGAMENTO, ITCON_PAG_STATUS_RECEBER,
    ITCON_REC_TIPO_CONTA_CLASS,
    ITCON_REC_TIPO_CONTA_STATUS, ITCONREC_REC_STATUS_CLASS_MAP
} from "@/constants.jsx";

export default function Received(receivedList) {

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

    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contas Recebidas</h2>}
        >
            <Head title="Contas Recebidas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CODIGO</th>
                                    <th className="px-1 py-2">NUMERO DOCUMENTO</th>
                                    <th className="px-5 py-2">DESCRICAO</th>
                                    <th className="px-3 py-2">VALOR PAGAMENTO</th>
                                    <th className="px-3 py-2">DIA RECEBIMENTO</th>
                                    <th className="px-3 py-2">RESPONSAVEL FINANCEIRO</th>
                                    <th className="px-3 py-2">USUARIO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {receivedList.received.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-3 py-2 pt-4 text-center">
                                                Nenhum resultado encontrado
                                            </td>
                                        </tr>
                                    ) : (
                                receivedList.received.data.map((item) => (
                                    <tr key={item.CD_ITCON_REC} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{item.CD_ITCON_REC}</td>
                                        <td className="px-1 py-2">{item.nr_documento}</td>
                                        <td className="px-5 py-2">{item.ds_reccon_rec}</td>
                                        <td className="px-3 py-2">R$ {item.vl_recebido}</td>
                                        <td className="px-3 py-2">{item.dt_recebimento}</td>
                                        <td className="px-3 py-2">{item.nm_responsavel}</td>
                                        <td className="px-3 py-2">{item.nm_usuario}</td>
                                    </tr>
                                ))
                                )}
                                </tbody>
                            </table>
                            <Pagination links={receivedList.received.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
