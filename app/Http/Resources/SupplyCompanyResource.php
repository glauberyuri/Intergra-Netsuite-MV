<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplyCompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "CD_FORNECEDOR" => $this->cd_fornecedor,
            "NM_FORNECEDOR" => $this->nm_fornecedor,
            "NR_CGC_CPF" => $this->nr_cgc_cpf,
            "DS_ENDERECO" => $this->ds_endereco,
            "NM_CIDADE" => $this->nm_cidade
        ];
    }
}
