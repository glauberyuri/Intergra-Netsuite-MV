<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FinanceManagerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "CD_RESPONSAVEL" => $this->cd_responsavel,
            "NM_RESPONSAVEL" => $this->nm_responsavel,
            "NR_CPF" => $this->nr_cpf,
            "DS_ENDERECO" => $this->ds_endereco,
        ];
    }
}
