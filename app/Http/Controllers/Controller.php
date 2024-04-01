<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;


class Controller extends BaseController
{
    public function data(){
        try {
            $data = DB::connection('oracle')->select('select * from itcon_pag_integra');
            dd($data);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
