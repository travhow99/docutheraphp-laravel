<?php

use App\Document;
use Illuminate\Http\Request;

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
Route::post('/client', 'ClientController@store');
Route::patch('/client/{client}', 'ClientController@update');
Route::delete('/client/{client}', 'ClientController@destroy');

/**
 * Sessions
 */
Route::get('/sessions', function () {
    $sessions = Document::orderBy('session_date', 'asc')->get();

    return view('documents', [
        'sessions' => $sessions
    ]);
});

/**
 * Add new documentation
 */
Route::post('/document', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'session_date'  => 'required',
        'documentation' => 'required',
    ]);

    if ($validator->fails()) {
        return redirect('/')
            ->withInput()
            ->withErrors($validator);
    }
    
    $document = new Document;
    $document->session_date = $request->session_date;
    $document->documentation = $request->documentation;
    
    $document->save();

    return redirect('/');
});

/**
 * Delete existing documentation
 */
Route::delete('/document/{id}', function ($id) {
    Document::findOrFail($id)->delete();

    return redirect('/');
});