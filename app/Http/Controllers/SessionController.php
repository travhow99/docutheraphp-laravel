<?php

namespace App\Http\Controllers;

use App\Session;
use App\Client;
use App\Documentation;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    /**
     * Create a new controller instance
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display all of a client's past sessions.
     * 
     * @param Request $request
     * @param Client $client
     * @return Response
     */
    public function index(Request $request, Client $client)
    {
        return view('sessions.index', [
            'client' => $client,
        ]);
    }

    /**
     * @param Request $request
     * @param Client $client
     * @return Response
     */
    public function create(Request $request, Client $client)
    {

        $this->validate($request, [
            'session_date' => 'required',
            'status' => 'required',
        ]);

        $session = $client->sessions()->create([
            'client_id' => $client->id,
            'session_date' => $request->session_date,
            'session_time' => $client->session_time,
            "$request->status" => 1,
        ]);

        return view('sessions.edit', [
            'session' => $session,
        ]);
    }

    /**
     * @param Request $request
     * @param Session $session
     */
    public function edit(Request $request, Session $session)
    {
        $templates = $session->client()->first()->user()->first()->templates()->get();
        // dd(Session::find(1)->documentation);
        // dd($session->documentation->documentation);
        // $documentation = $session->documentation;
        // dd($documentation);

        return view('sessions.edit', [
            'session' => $session,
            'templates' => $templates
        ]);
    }

    /**
     * Update the given client.
     * 
     * @param Request $request
     * @param string $id
     * @return Response
     */
    public function update(Request $request, $sessionId)
    {
        $data = Request()->all();

        $session = Session::find($sessionId);

        // Fill in updated values
        $session->fill($data);

        $session->save();

        return redirect("/session/{$session->id}/edit");
    }


}
