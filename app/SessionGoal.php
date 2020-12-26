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
    protected $fillable = ['session_id', 'goal', 'objective', 'count', 'addressed', 'met_objective', 'notes'];

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

    /**
     * Get all of the session goal's attributes.
     */
    public function attributes()
    {
        return $this->morphMany(SessionAttribute::class, 'attributable');
    }
}
