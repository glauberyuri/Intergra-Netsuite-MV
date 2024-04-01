<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PayablesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $dt_vencimento = Carbon::parse($this->dt_vencimento);
        $today = Carbon::today();

        // Verifica se a data de vencimento é anterior à data atual
        $tp_vencimento = $dt_vencimento->lt($today) ? 'V' : 'P';

        return [
            "nm_fornecedor" => $this->nm_fornecedor,
            "tp_vencimento" => $tp_vencimento,
            "cd_itcon_pag" => $this->cd_itcon_pag,
            "cd_con_pag" => $this->cd_con_pag,
            "vl_duplicata" => $this->vl_duplicata,
            "tp_quitacao" => $this->tp_quitacao,
            "dt_vencimento" => (new Carbon($this->dt_vencimento))->format('Y-m-d')
        ];
    }
}
