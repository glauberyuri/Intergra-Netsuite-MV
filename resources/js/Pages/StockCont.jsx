import { Head } from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import RealMasked from "@/Components/FormatNumber.jsx";

function formatarValorParaReais(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
export default function StockCont(stocks, stockList) {
    console.log(stockList);
    console.log(stocks);
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Estoque</h2>}
        >
            <Head title="Estoque" />

            <div className="py-12">
                <div className="max-w-screen-2xl mx-auto sm:px-4 lg:px-6">
                    <div className="bg-white flex flex-row dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3 text-gray-900 dark:text-gray-100">
                            <h2 className="font-semibold text-xl text-center pb-2 text-gray-800 dark:text-gray-200 leading-tight">Lista Entrada Saida do Estoque</h2>
                            <table className="w-full border border-gray-500 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CD_ESPECIE</th>
                                    <th className="px-3 py-2">ESPECIE</th>
                                    <th className="px-3 py-2">VALOR TOTAL</th>
                                    <th className="px-3 py-2">DATA DE ENTRADA</th>
                                    <th className="px-3 py-2">CD_FORNECEDOR</th>
                                    <th className="px-3 py-2">ENT/SAIDA</th>
                                    <th className="px-3 py-2">CD_ENTRADA</th>
                                    <th className="px-3 py-2">CD_SAIDA</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stocks.stocks.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-3 py-2 pt-4 text-center">
                                            Nenhum resultado encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    stocks.stocks.data.map((item) => (
                                        <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{item.CD_ESPECIE}</td>
                                            <td className="px-3 py-2">{item.DS_ESPECIE}</td>
                                            <td className="px-3 py-2"><RealMasked value={item.VL_TOTAL} /></td>
                                            <td className="px-3 py-2">{item.DT_ENTRADA}</td>
                                            <td className="px-3 py-2">{item.CD_FORNECEDOR}</td>
                                            <td className="px-3 py-2">{item.ES_ENTSAI}</td>
                                            <td className="px-3 py-2">{item.CD_ENT_PRO}</td>
                                            <td className="px-3 py-2">{item.CD_MVTO_ESTOQUE}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            <Pagination links={stocks.stocks.meta.links} />
                        </div>
                        <div className="p-3 text-gray-900 dark:text-gray-100">
                            <h2 className={`font-semibold text-xl text-center pb-2 text-gray-800 dark:text-gray-200 leading-tight ${stocks.stockList.data.length === 0 ? 'hidden' : ''}`}>Estoque Geral</h2>
                            <table className={`w-full border border-gray-500 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${stocks.stockList.data.length === 0 ? 'hidden' : ''}`}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">CD_ESPECIE</th>
                                    <th className="px-3 py-2">ESPECIE</th>
                                    <th className="px-3 py-2">VALOR TOTAL</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stocks.stockList.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-3 py-2 pt-4 text-center">
                                            Nenhum resultado encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    stocks.stockList.data.map((item) => (
                                        <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{item.CD_ESPECIE}</td>
                                            <td className="px-3 py-2">{item.DS_ESPECIE}</td>
                                            <td className="px-3 py-2"><RealMasked value={item.VL_TOTAL_ESTOQUE} /></td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
