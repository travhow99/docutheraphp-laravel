<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['name', 'session_day', 'session_time', 'start_date', 'agency', 'active'];

    /**
     * Get the user that owns the client.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sessions for the client.
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
