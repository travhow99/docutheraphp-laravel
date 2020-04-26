<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SessionGoal extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['session_id', 'goal_id', 'count', 'addressed', 'met_objective', 'fillable'];

    /**
     * Get the session the sessionGoal belongs to.
     */
    public function session()
    {
        return $this->belongsTo('App\Session');
    }

    /**
     * Get the goal the sessionGoal belongs to.
     */
    public function goal()
    {
        return $this->belongsTo('App\Goal');
    }
}
