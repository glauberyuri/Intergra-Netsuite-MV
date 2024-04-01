import { Head } from '@inertiajs/react';
import IntegraLayout from "@/Layouts/IntegraLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {CONPAG_VENCIMENTO_TEXT, ITCON_PAG_STATUS_PAGAMENTO} from "@/constants.jsx";
import { ITCON_PAG_STATUS_CLASS_MAP } from "@/constants.jsx";
export default function PrivateAccounts() {
    return (
        <IntegraLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contas Particular</h2>}
        >
            <Head title="Contas Particular" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2>Em desenvolvimento...</h2>
                        </div>
                    </div>
                </div>
            </div>
        </IntegraLayout>
    );
}
