<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DateTime;

class Client extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['name', 'session_day', 'session_time', 'start_date', 'agency', 'active'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['next_session'];

    /**
     * Get the user that owns the client.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the client's Pocs.
     */
    public function pocs()
    {
        return $this->hasMany('App\Poc');
    }

    /**
     * Get the client's Sessions.
     */
    public function sessions()
    {
        return $this->hasMany('App\Session');
    }

    /**
     * Get the client's next session.
     * 
     */
    public function getNextSessionAttribute()
    {
        // Create a new DateTime object
        $date = new DateTime();

        if ($this->session_day && $this->start_date) {
            // Modify the date it contains
            $date->modify("next " . $this->session_day);
    
            // Output
            return $date->format('m-d-Y');
        } else {
            return "Session not available";
        }
    }

}
