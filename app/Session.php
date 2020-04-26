<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['client_id', 'session_date', 'session_time', 'complete', 'cancelled', 'submitted', 'billed', 'notes'];

    /**
     * Return the client who owns the session.
     */
    public function client()
    {
        return $this->belongsTo('App\Session');
    }

    /**
     * Get the SessionGoals the Goal has.
     */
    public function sessionGoals()
    {
        return $this->hasMany('App\SessionGoal');
    }

}
