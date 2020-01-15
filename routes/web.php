<?php

use App\Document;
use Illuminate\Http\Request;

Route::get('/', function () {
    if (!Auth::user()) {
        return view('welcome');
    } else {
        return view('dashboard');
    }
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

/**
 * Clients
 */
Route::get('/clients', 'ClientController@index');
Route::get('clients/{client}/edit', 'ClientController@edit');
Route::post('/client', 'ClientController@store');
Route::patch('/client/{client}', 'ClientController@update');
Route::delete('/client/{client}', 'ClientController@destroy');

/**
* Pocs
*/
// Route::get('/contacts', 'PocController@index');
Route::get('/client/{client}/contact', 'PocController@create');
Route::get('contacts/{contact}/edit', 'PocController@edit');
Route::post('/contact', 'PocController@store');
Route::patch('/contact/{contact}', 'PocController@update');
Route::delete('/contact/{contact}', 'PocController@destroy');

/**
 * Sessions
 */
Route::get('/clients/{client}/sessions', 'SessionController@index');
Route::get('/session/{session}/edit', 'SessionController@edit');
Route::post('/clients/{client}/session', 'SessionController@create');
Route::post('/session/{session}', 'SessionController@update');

/**
 * Documentations
 */
Route::get('/documentation/{documentation}', 'DocumentationController@index');
Route::get('/documentation/{documentation}/edit', 'DocumentationController@edit');
Route::post('/session/{session}/documentation', 'DocumentationController@store');

/**
 * Templates
 */
Route::get('/templates', 'TemplateController@index');
Route::post('/template', 'TemplateController@store');
Route::delete('/template/{template}', 'TemplateController@destroy');

