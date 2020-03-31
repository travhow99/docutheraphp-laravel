<?php

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

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

/**
 * Clients
 */
Route::get('clients', 'ClientController@index');
Route::get('clients/{client}/edit', 'ClientController@edit');
Route::post('client', 'ClientController@store');
Route::patch('client/{client}', 'ClientController@update');
Route::delete('client/{client}', 'ClientController@destroy');

/**
* Pocs
*/
// Route::get('contacts', 'PocController@index');
// Route::get('client/{client}/contact', 'PocController@index');
// Route::get('contacts/{contact}/edit', 'PocController@edit');
// Route::post('poc', 'PocController@store');
// Route::patch('contact/{contact}', 'PocController@update');
// Route::delete('contact/{contact}', 'PocController@destroy');

/**
 * Sessions
 */
// Route::get('clients/{client}/sessions', 'SessionController@index');
// Route::get('session/{session}/edit', 'SessionController@edit');
// Route::post('clients/{client}/session', 'SessionController@create');
// Route::post('session/{session}', 'SessionController@update');

/**
 * Documentations
 */
// Route::get('documentation/{documentation}', 'DocumentationController@index');
// Route::get('documentation/{documentation}/edit', 'DocumentationController@edit');
// Route::post('session/{session}/documentation', 'DocumentationController@store');

/**
 * Templates
 */
Route::get('templates', 'TemplateController@index');
Route::post('template', 'TemplateController@store');
Route::delete('template/{template}', 'TemplateController@destroy');
