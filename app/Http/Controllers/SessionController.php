<?php

namespace App\Http\Controllers;

use App\Session;
use App\Client;
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
     * @return Response
     */
    public function index(Request $request, Client $client)
    {
        return view('sessions.index', [
            'client' => $client,
        ]);
    }
}
