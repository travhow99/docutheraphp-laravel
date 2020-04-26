<?php

namespace App\Http\Controllers\Api;

use App\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Session;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $client = Client::find($id);
        $sessions = $client->sessions()->get();

        return response([
            'client' => $client,
            'sessions' => $sessions,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'session_date' => 'required',
            'session_time' => 'required',
        ]);

        $client = Client::find($id);

        $session = $client->sessions()->create([
            'client_id' => $id, 
            'session_date' => $request->session_date,
            'session_time' => $request->session_time,
        ]);

        /**
         * TODO: 
         * Create Session
         * Create SessionGoal foreach active Goal
         */

        return response($session, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $session = Session::find($id);

        return response($session, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Request()->all();

        $session = Session::find($id);

        $session->save();

        return response('success', 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $session = Session::find($id);

        $session->delete();

        return response('success', 200);
    }
}
