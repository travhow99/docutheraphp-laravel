<?php

use App\Client;
use App\Http\Controllers\Api\InvoiceController;
use App\Invoice;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {

    // public routes
    Route::post('/login', 'Api\AuthController@login')->name('login.api');
    Route::post('/register', 'Api\AuthController@register')->name('register.api');

    // private routes
    Route::middleware('auth:api')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::get('/logout', 'Api\AuthController@logout')->name('logout');

        /**
         * Clients
         */
        Route::apiResource('clients', 'Api\ClientController');
        Route::post('/clients/upcoming', function (Request $request) {
            $clients = $request->user()->therapy_clients()->get();
            $upcoming = $request->user()->sessions()->whereMonth('session_date', '=', now()->month)->orderBy('session_date')->get()->groupBy('session_date');
            // TODO: Order by next_session day
            return response([
                'clients' => $clients,
                'upcomingSessions' => $upcoming,
            ], 201);
        });


        /**
         * Session
         */
        // Get sessions by month
        Route::post('/sessions/month/{month}', function (Request $request, $month) {
            $sessions = $request->user()->sessions()->whereMonth('session_date', '=', $month)->orderBy('session_date')->get()->groupBy('session_date');

            return response([
                'sessions' => $sessions,
            ], 201);
        });

        /**
         * Invoices
         */
        Route::get('invoices', function (Request $request) {
            $invoices = $request->user()->invoices()->get();

            return response([
                'invoices' => $invoices,
            ], 200);
        });

        Route::get('invoices/{invoice}', 'Api\InvoiceController@show');
        Route::get('sessions/completed', 'Api\SessionController@completed');
        Route::get('clients/{client}/sessions/completed', 'Api\SessionController@completed');
        
        /**
         * Pocs, Sessions
         * TODO: Switch to shallow resource upon upgrading Laravel.
         */
        Route::apiResources([
            'clients.pocs' => 'Api\PocController',
            'clients.goals' => 'Api\GoalController',
            'clients.sessions' => 'Api\SessionController',
            'sessions.sessionGoals' => 'Api\SessionGoalController',
            'sessionAttributes' => 'Api\SessionAttributeController',
            'clients.invoices' => 'Api\InvoiceController',
            'invoices.invoiceLineItems' => 'Api\InvoiceLineItemController',
        ]);//->shallow();

    });

});
