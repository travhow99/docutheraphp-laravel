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
            // 'session_date' => 'required',
            // 'session_time' => 'required',
        ]);

        $client = Client::find($id);

        $session = $client->sessions()->create([
            'client_id' => $id, 
            'session_date' => $client->nextSessionFormatted(),// . ' 00:00:00',
            'session_time' => $client->session_time,
        ]);

        /**
         * TODO: 
         * Create Session
         * Create SessionGoal foreach active Goal
         */

        $sessionGoals = $this->createSessionGoals($client, $session);

        return response([
            'client' => $client,
            'session' => $session,
            'goals' => $sessionGoals,
        ], 200);
    }

    /**
     * Create the SessionGoals for the session.
     * 
     * @param App\Client $client
     * @param App\Session $session
     * @return \Illuminate\Http\Response
     */
    public function createSessionGoals(Client $client, Session $session)
    {
        $goals = $client->goals()->get();

        $sessionGoals = [];

        foreach ($goals as $goal) {
            array_push(
                $sessionGoals, 
                $session->sessionGoals()->create([
                    'goal' => $goal->goal,
                    'objective' => $goal->objective,
                ])
            );
        }

        return $sessionGoals;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($client_id, $session_id)
    {
        $client = Client::find($client_id);
        $session = Session::find($session_id);
        $goals = $session->sessionGoals()->get();

        return response([
            'client' => $client,
            'session' => $session,
            'goals' => $goals,
        ], 200);
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
    public function destroy($client_id, $session_id)
    {
        Session::destroy($session_id);

        return response('success', 200);
    }
}
