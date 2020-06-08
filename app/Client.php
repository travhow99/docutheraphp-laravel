<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use DateTime;

class Client extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['name', 'session_day', 'session_time', 'start_date', 'agency', 'active', 'address', 'diagnosis', 'approach'];

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

        // dd($this->lastSession());

        if ($this->lastSession()->session_date !== 'No sessions' && new DateTime($this->lastSession()->session_date) >= $date) {
            return $this->lastSession();
        } else if ($this->session_day && $this->start_date) {
            // Modify the date it contains
            $date->modify("next " . $this->session_day);

            $nextSession = new Session(['session_date' => $date->format('m-d-Y')]);
            return $nextSession;
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
     * @todo account for timezone
     */
    public function lastSession()
    {
        $date = new DateTime();

        $return = $this->sessions()->where('session_date', '<=', $date->format('Y-m-d'))->where('session_time', '<=', $date->format('H:m:s'))->orderBy('session_date', 'DESC')->first(); 
        
        if (!$return) {
            $app = app();
            $return = $app->make('stdClass');
            $return ->session_date = 'No sessions';
        }

        return $return;
    }

    /**
     * Set the last session attribute.
     */
    public function getLastSessionAttribute()
    {
        return $this->lastSession();
    }
}
