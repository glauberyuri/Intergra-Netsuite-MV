<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DebitAccountsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "nm_fornecedor" => $this->nm_fornecedor,
            "cd_pagcon_pag" => $this->cd_pagcon_pag,
            "cd_itcon_pag" => $this->cd_itcon_pag,
            "vl_pago" => $this->vl_pago,
            "dt_pagamento" => (new Carbon($this->dt_pagamento))->format('Y-m-d')
        ];
    }
}
