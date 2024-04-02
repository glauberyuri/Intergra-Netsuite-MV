<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/dashboard');


route::get('/payables', [\App\Http\Controllers\IntegraController::class, 'payablesPage'])->name('payables.index');
route::get('/get-payables-table', [\App\Http\Controllers\IntegraController::class, 'GetPayables'])->name('payables.get');

route::get('/debit-accounts', [\App\Http\Controllers\IntegraController::class, 'debitAccountsPage'])->name('debit.index');

route::get('/finance-manager', [\App\Http\Controllers\IntegraController::class, 'financeManagerPage'])->name('finance.index');

route::get('/supply-company', [\App\Http\Controllers\IntegraController::class, 'supplyCompanyPage'])->name('company.index');

route::get('/private-accounts', [\App\Http\Controllers\IntegraController::class, 'privateAccountsPage'])->name('private.index');
route::get('/get-private-table', [\App\Http\Controllers\IntegraController::class, 'getPrivates'])->name('private.get');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
