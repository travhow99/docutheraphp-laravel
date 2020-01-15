<?php

namespace App\Http\Controllers;

use App\Client;
use App\Poc;
use Illuminate\Http\Request;

class PocController extends Controller
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
     * @param Poc $poc
     * @return Response
     */
    public function index()
    {
        $user = auth()->user();
        $pocs = $user->pocs;
        return view('pocs.index', [
            'pocs' => $pocs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Client $client
     * @return Response
     */
    public function create(Client $client)
    {
        return view('poc.index', [
            'client' => $client,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request, Client $client)
    {
        $this->validate($request, [
            'contact_name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
            'client_id' => 'required',
        ]);

        $notes = $request->notes ?: '';

        Poc::create([
            'client_id' => $request->client_id,
            'contact_name' => $request->contact_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'notes' => $notes,
        ]);

        return redirect("/clients/{$request->client_id}/edit");

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Poc  $poc
     * @return Response
     */
    public function show(Poc $poc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Poc  $poc
     * @return Response
     */
    public function edit(Poc $poc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  \App\Poc  $poc
     * @return Response
     */
    public function update(Request $request, Poc $poc)
    {
        //
    }

    /**
     * Destroy the given client.
     * 
     * @param Request $request
     * @param Poc $poc
     * @return Response
     */
    public function destroy(Request $request, Poc $poc)
    {
        $this->authorize('destroy', $poc);

        $poc->delete();

        return redirect('/pocs');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Poc  $poc
     * @return Response
     */
    /* public function destroy(Poc $poc)
    {
        $this->authorize('destroy', $poc);

        dd($poc);
    } */

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
