<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Session;
use App\SessionGoal;

class SessionGoalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $session = Session::find($id);
        $sessionGoals = $session->sessionGoals()->get();

        return response([
            'session' => $session,
            'sessionGoals' => $sessionGoals,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'count' => 'required',
        ]);

        $session = Session::find($id);

        $data = $request->all();

        $sessionGoal = $session->sessionGoals()->create($data);

        return response($sessionGoal, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, $sessionGoalId)
    {
        $sessionGoal = SessionGoal::find($sessionGoalId);
        $sessionGoal->fill($request->all());
        $sessionGoal->save();

        return response($sessionGoal, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
