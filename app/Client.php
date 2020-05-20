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
    protected $appends = ['next_session', 'last_session'];

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
     * Get the client's Goals.
     */
    public function goals()
    {
        return $this->hasMany('App\Goal');
    }

    /**
     * Get the client's next session.
     * @todo Determine if session exists already
     */
    public function nextSession()
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

    /**
     * Get the client's next session formatted for a DB entry YYYY-MM-DD
     */
    public function nextSessionFormatted()
    {
        $date = new DateTime();
        $date->modify("next " . $this->session_day);
        return $date->format('Y-m-d');
    }

    /**
     * Set the next session attribute.
     */
    public function getNextSessionAttribute()
    {
        return $this->nextSession();
    }

    /**
     * Get the client's most recent session.
     */
    public function lastSession()
    {
        return $this->sessions()->orderBy('session_date', 'DESC')->first();
    }

    /**
     * Set the last session attribute.
     */
    public function getLastSessionAttribute()
    {
        return $this->lastSession();
    }
}
