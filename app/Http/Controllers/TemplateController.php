<?php

namespace App\Http\Controllers;

use App\User;
use App\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
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
     * Display a listing of the resource.
     *
     * @param Template $template
     * @return Response
     */
    public function index()
    {
        $user = auth()->user();
        $templates = $user->templates;
        return view('templates.index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request, User $user)
    {
        $this->validate($request, [
            'name' => 'required',
            'template' => 'required',
        ]);

        $request->user()->templates()->create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'agency' => $request->agency,
            'template' => html_entity_decode($request->template),
        ]);

        return redirect('/templates');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Template  $template
     * @return Response
     */
    public function show(Template $template)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Template  $template
     * @return Response
     */
    public function edit(Template $template)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  \App\Template  $template
     * @return Response
     */
    public function update(Request $request, Template $template)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Template  $template
     * @return Response
     */
    public function destroy(Template $template)
    {
        //
    }

    /**
     * Return the requested template.
     * 
     * @param Request $request
     * @return Response
     */
    public function single(Request $request)
    {
        dd($request);
    }
}
