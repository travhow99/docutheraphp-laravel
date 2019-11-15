<?php

namespace App\Http\Controllers;

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
    public function index(Request $request)
    {
        return view('sessions.index');
    }
}
