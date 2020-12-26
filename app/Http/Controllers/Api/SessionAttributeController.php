<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Session;
use App\SessionAttribute;

class SessionAttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        // $client = Client::find($id);

        // return response($pocs, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // If element already exists, delete it
        $previous = SessionAttribute::where('attributable_id', $request->attributable_id)
                        ->where('name', $request->name);

        if ($previous) {
            $previous->delete();
        }

        $session = Session::find($request->attributable_id);

        $attr = $session->attributes()->create([
            'name' => $request->name,
            'attribute' => $request->attribute,
            // 'attributable_id' => $request->attributable_id,
        ]);

        return response($attr, 201);
    }
}
