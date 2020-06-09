<?php

namespace App\Http\Controllers\Api;

use App\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Poc;

class PocController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $client = Client::find($id);
        $pocs = $client->pocs()->get();

        return response($pocs, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $client = Client::find($id);
        $poc = $client->pocs()->create([
            'contact_name' => $request->contact_name, 
            'email' => $request->email ?: '', 
            'phone_number' => $request->phone_number ?: '',
            'notes' => $request->notes,
        ]);

        return response($poc, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $poc = Poc::find($id);

        return response($poc, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @todo validate types
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $client_id, $poc_id)
    {
        $data = Request()->all();
        /* 
        TODO: validate
        $request->validate([
            ''
        ]) */
        
        $poc = Poc::find($poc_id);

        $poc->fill($data);
        $poc->save();

        return response('success', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($client_id, $poc_id)
    {
        $poc = Poc::find($poc_id);

        $poc->delete();
        
        return response('success', 200);
    }
}
