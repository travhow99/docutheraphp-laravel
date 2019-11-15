<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\DocumentRepository;

class DocumentController extends Controller
{
    /**
     * The document repository instance.
     * 
     * @var DocumentRepository
     */
    protected $documents;
    
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
     * Display a list of all the user's documents.
     * 
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        return view('document');
    }
}
