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

        return view('clients.index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Create a new client.
     * 
     * @param Request $request
     * @return Response
     */
    // TODO: possibly switched with @create?
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
     * Edit the given client.
     * 
     * @param Request $request
     * @return Response
     */
    public function edit(Request $request, $client)
    {
        // dd($client->session_day);
        return view('clients.edit', [
            'client' => $client,
        ]);
    }
    
    /**
     * Update the given client.
     * 
     * @param Request $request
     * @param string $id
     * @return Response
     */
    public function update(Request $request, $client)
    {
        $data = Request()->all();

        // Fill in updated values
        $client->fill($data);

        $client->save();

        return redirect("/clients/{$client->id}/edit");
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
