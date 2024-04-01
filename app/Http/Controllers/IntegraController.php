<?php

namespace App\Http\Controllers;

use App\Http\Resources\DebitAccountsResource;
use App\Http\Resources\FinanceManagerResource;
use App\Http\Resources\PayablesResource;
use App\Http\Resources\SupplyCompanyResource;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;
class IntegraController extends Controller
{
/*    public function data()
    {


        dump($data);
    }*/
    public function payablesPage()
    {
        $query = DB::connection('oracle')->table('itcon_pag ip')->select('f.nm_fornecedor','c.tp_vencimento','ip.cd_itcon_pag', 'ip.cd_con_pag', 'ip.vl_duplicata', 'ip.tp_quitacao', 'ip.dt_vencimento')
            ->leftJoin('con_pag as c', 'c.cd_con_pag', '=', 'ip.CD_CON_PAG')
            ->leftJoin('fornecedor as f', 'f.CD_FORNECEDOR', '=', 'c.CD_FORNECEDOR')
            ->where('cd_itcon_pag', '>' , 	480926)
            ->orderBy('ip.CD_ITCON_PAG', 'desc');

        $payablesList = $query->paginate(10)->onEachSide(1);

        return inertia('Payables', ["payables" => PayablesResource::collection($payablesList)]);
    }

    public function GetPayables() {

        $query = DB::connection('oracle')->table('itcon_pag ip')->select('f.nm_fornecedor','c.tp_vencimento','ip.cd_itcon_pag', 'ip.cd_con_pag', 'ip.vl_duplicata', 'ip.tp_quitacao', 'ip.dt_vencimento')
            ->leftJoin('con_pag as c', 'c.cd_con_pag', '=', 'ip.CD_CON_PAG')
            ->leftJoin('fornecedor as f', 'f.CD_FORNECEDOR', '=', 'c.CD_FORNECEDOR')
            ->where('cd_itcon_pag', '>' , 	480926)
            ->orderBy('ip.CD_ITCON_PAG', 'desc');

        $payablesList = $query->paginate(10)->onEachSide(1);

        return ["payables" => PayablesResource::collection($payablesList)];
    }

    public function debitAccountsPage()
    {
        $query = DB::connection('oracle')->table('itcon_pag_integra ipi')->select('f.nm_fornecedor','ppi.cd_pagcon_pag','ppi.cd_itcon_pag', 'ppi.vl_pago', 'ppi.dt_pagamento')
            ->leftJoin('con_pag as c', 'c.cd_con_pag', '=', 'ipi.CD_CON_PAG')
            ->leftJoin('fornecedor as f', 'f.CD_FORNECEDOR', '=', 'c.CD_FORNECEDOR')
            ->join('PAGCON_PAG_INTEGRA as ppi', 'ppi.CD_ITCON_PAG', '=', 'ipi.CD_ITCON_PAG')
            ->select('f.nm_fornecedor', 'ppi.*')
            ->orderBy('ppi.DT_PAGAMENTO', 'desc');

        $debit = $query->paginate(10)->onEachSide(1);

        return inertia('DebitAccounts', ["debitAccounts" => DebitAccountsResource::collection($debit)]);
    }
    public function supplyCompanyPage()
    {
        $query = DB::connection('oracle')->table('FORNECEDOR_INTEGRA fi')->select('fi.CD_FORNECEDOR','fi.NM_FORNECEDOR', 'fi.NR_CGC_CPF', 'fi.DS_ENDERECO', 'c.NM_CIDADE')
             ->leftJoin('cidade c', 'c.cd_cidade', '=', 'fi.cd_cidade');

        $company = $query->paginate(10)->onEachSide(1);

        return inertia('SupplyCompany', ["companies" => SupplyCompanyResource::collection($company)]);
    }
    public function financeManagerPage()
    {
        $query = DB::connection('oracle')->table('RESPONSAVEL_INTEGRA')->select('CD_RESPONSAVEL','NM_RESPONSAVEL', 'NR_CPF', 'DS_ENDERECO');

        $finance = $query->paginate(10)->onEachSide(1);

        return inertia('FinanceManager', ["finances" => FinanceManagerResource::collection($finance)]);
    }

    public function privateAccountsPage(){
        return inertia('PrivateAccounts');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
