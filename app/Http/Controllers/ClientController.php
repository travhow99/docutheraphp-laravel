<?php

namespace App\Http\Controllers;

use App\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\ClientRepository;

class ClientController extends Controller
{
    /**
     * The client repository instance
     * 
     * @var ClientRepository
     */
    protected $clients;
    
    /**
     * Create a new controller instance
     * 
     * @param ClientRepository $clients
     * @return void
     */
    public function __construct(ClientRepository $clients)
    {
        $this->middleware('auth');

        $this->clients = $clients;
    }

    /**
     * Display user's clients.
     * 
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $clients = Client::where('user_id', $request->user()->id)->get();

        return view('clients', [
            'clients' => $clients,
        ]);
    }

    /**
     * Create a new client.
     * 
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            // 'user_id' => 'required',
            'name' => 'required|max:4',
            'agency' => 'required',
        ]);

        $request->user()->clients()->create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'agency' => $request->agency,
        ]);

        return redirect('/clients');
    }
    
    /**
     * Update the given client.
     * 
     * @param Request $request
     * @param string $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        // Take input from Manage User page
        // $name = Input::get('name');
        // $agency = Input::get('agency');
        // $session_day = Input::get('session_day');
        // $session_time = Input::get('session_time');
        // $start_date = Input::get('start_date');
        // $active = Input::get('active');

        $data = Input::all();

        // Grab the record to be updated
        $client = Client::find($id);

        // Fill in updated values
        $client->fill($data);

        $client->save();
    }

    /**
     * Destroy the given client.
     * 
     * @param Request $request
     * @param Client $client
     * @return Response
     */
    public function destroy(Request $request, Client $client)
    {
        $this->authorize('destroy', $client);

        $client->delete();

        return redirect('/clients');
    }
}
