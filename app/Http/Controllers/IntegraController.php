<?php

namespace App\Http\Controllers;

use App\Http\Resources\DebitAccountsResource;
use App\Http\Resources\FinanceManagerResource;
use App\Http\Resources\PayablesResource;
use App\Http\Resources\ReceivedResource;
use App\Http\Resources\StockContResource;
use App\Http\Resources\StockListResource;
use App\Http\Resources\SupplyCompanyResource;
use App\Http\Resources\PrivateAccounts;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;
class IntegraController extends Controller
{
    public function payablesPage()
    {
        $query = DB::connection('oracle')
            ->table('itcon_pag as ip')
            ->select('f.nm_fornecedor', 'c.tp_vencimento', 'ip.nr_parcela', 'ip.cd_itcon_pag', 'ip.cd_con_pag', 'ip.vl_duplicata', 'ip.tp_quitacao', 'ip.dt_vencimento', 'c.cd_con_pag_previsao', 'pp.vl_acrescimo', 'pp.vl_desconto')
            ->leftJoin('con_pag as c', 'c.cd_con_pag', '=', 'ip.cd_con_pag')
            ->leftJoin('pagcon_pag as pp', 'pp.cd_itcon_pag', '=', 'ip.cd_itcon_pag')
            ->leftJoin('fornecedor as f', 'f.cd_fornecedor', '=', 'c.cd_fornecedor')
            ->where('ip.cd_itcon_pag', '>', 480926)
            ->orderBy('ip.cd_itcon_pag', 'desc');

        //Filter status on quitacao
        if(request("status")) {
            $query->where("tp_quitacao", request("status"));
        }

        $payablesList = $query->paginate(10)->onEachSide(1);

        return inertia('Payables',
                                 ["payables" => PayablesResource::collection($payablesList),
                                 'queryParams' => request()->query() ?: null,
        ]);
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
        $query = DB::connection('oracle')->table('itcon_rec it')
            ->select('it.cd_itcon_rec','it.nr_parcela', 'c.dt_emissao', 'it.dt_vencimento','it.tp_quitacao', 'it.vl_duplicata', 'c.nm_cliente', 'c.tp_con_rec')
            ->Join('con_rec c', 'c.cd_con_rec', '=', 'it.cd_con_rec')
            ->Where('it.cd_itcon_rec' ,'>' , 162871)
            ->orderBy('it.cd_itcon_rec', 'desc');


        //Filter status on tipo
        if(request("statusTipo")) {
            $query->where("c.tp_con_rec", request("statusTipo"));
        }
        $private = $query->paginate(10)->onEachSide(1);

        return inertia('PrivateAccounts',
                        [
                         "privates" => PrivateAccounts::collection($private),
                         "queryParams" => request()->query() ?: null,
                        ]
        );
    }

/*    public function getPrivates()
    {
        $query = DB::connection('oracle')->table('itcon_rec it')
            ->select('it.cd_itcon_rec','it.nr_parcela', 'c.dt_emissao', 'it.dt_vencimento', 'it.vl_duplicata', 'it_tp_quitacao', 'c.nm_cliente', 'c.tp_con_rec')
            ->Join('con_rec c', 'c.cd_con_rec', '=', 'it.cd_con_rec');
        $private = $query->paginate(10)->onEachSide(1);

       return (["data" => PrivateAccounts::collection($private)]);
    }*/

    public function receivedPage()
    {
        $query = DB::connection('oracle')->table('RECCON_REC_INTEGRA rri')
            ->select('rri.cd_itcon_rec','rri.nr_documento', 'rri.ds_reccon_rec', 'rri.dt_recebimento', 'rri.vl_recebido','rri.nm_usuario', 'rri.nm_responsavel');
        $received = $query->paginate(10)->onEachSide(1);

        return inertia('Received',["received" => ReceivedResource::collection($received)]);
    }


    public function stockContPage()
    {
        $queryStock = DB::connection('oracle')->table('EST_PRO as E')
            ->leftJoin('PRODUTO as P', 'P.CD_PRODUTO', '=', 'E.CD_PRODUTO')
            ->leftJoin('ESTOQUE as es', 'es.cd_estoque', '=', 'e.cd_estoque')
            ->leftJoin('especie as ep', 'ep.cd_especie', '=', 'p.cd_especie')
            ->selectRaw('
                ep.ds_especie,
                ep.cd_especie,
                ROUND(SUM(E.QT_ESTOQUE_ATUAL * (
                    SELECT ROUND(C1.VL_CUSTO_MEDIO, 4)
                    FROM CUSTO_MEDIO_MENSAL C1
                    WHERE C1.CD_CUSTO_MEDIO_MENSAL = (
                        SELECT C2.CD_CUSTO_MEDIO_MENSAL
                        FROM CUSTO_MEDIO_MENSAL C2
                        WHERE C2.CD_PRODUTO = P.CD_PRODUTO
                        AND C2.CD_MULTI_EMPRESA = 21
                        ORDER BY DH_CUSTO_MEDIO DESC
                        FETCH FIRST 1 ROW ONLY
                    )
                )), 2) AS VL_TOTAL_ESTOQUE
            ')
            ->where('E.QT_ESTOQUE_ATUAL', '>', 0)
            ->where('P.SN_MESTRE', 'N')
            ->where('es.cd_multi_empresa', 21)
            ->groupBy('ep.ds_especie', 'ep.cd_especie')
            ->orderBy('ep.ds_especie');

        $stockList = $queryStock->paginate(15)->onEachSide(1);
        $query = DB::connection('oracle')->table('integra_entsai_estoque')->select('CD_ESPECIE','DS_ESPECIE', 'TOTAL_ENTRADA', 'DATA_ENTRADA', 'CD_FORNECEDOR', 'ES_ENTSAI', 'CD_ENT_PRO', 'CD_MVTO_ESTOQUE')->orderBy('DATA_ENTRADA', 'DESC');

        $stock = $query->paginate(15)->onEachSide(1);

        return inertia('StockCont', ["stocks" => StockContResource::collection($stock), "stockList" => StockListResource::collection($stockList)]);
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
