<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['client_id', 'goal', 'objective', 'date_started', 'date_ended'];

    /**
     * Get the client that owns the goal.
     */
    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    /**
     * Get the SessionGoals the Goal has.
     */
    public function sessionGoals()
    {
        return $this->hasMany('App\SessionGoal');
    }
}
