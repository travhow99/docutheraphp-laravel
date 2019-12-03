<?php

namespace App\Http\Controllers;

use App\Documentation;
use App\Session;
use Illuminate\Http\Request;

class DocumentationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $documentationId)
    {
        $documentation = Documentation::find($documentationId);

        return view('documentation.index', [
            'documentation' => $documentationId,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Session $session
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Session $session)
    {
        $this->validate($request, [
            'documentation' => 'required',
        ]);

        $documentation = Documentation::create([
            'session_id' => $session->id,
            'documentation' => $request->documentation,
            'session_goals' => '',
        ]);

        return redirect("/documentation/{$documentation->id}");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function show(documentation $documentation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function edit(Documentation $documentation)
    {
        return view('documentations.edit', [
            'documentation' => $documentation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Documentation $documentation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function destroy(documentation $documentation)
    {
        //
    }
}
