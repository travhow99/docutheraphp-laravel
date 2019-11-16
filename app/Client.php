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

    /**
     * Determine the client's next session.
     */
    public function nextSession()
    {
        // Create a new DateTime object
        $date = new DateTime();

        if ($this->session_day) {
            // Modify the date it contains
            $date->modify("next " . $this->session_day);
    
            // Output
            return $date->format('m-d-Y');
        } else {
            return "Session not available";
        }
    }

    /**
     * Determine past estimated session dates.
     * @return Collection
     */
    public function pastSessions()
    {
        $day = $this->session_day;
        $startDate = strtotime($this->start_date);
        $endDate = strtotime('today');

        $sessionDates = [];
        for ($x = strtotime('Monday', $endDate); $x >= $startDate; $x = strtotime('-1 week', $x)) {
            array_push($sessionDates, date('l m-d-Y', $x));
        }

        return $sessionDates;
    }
}
