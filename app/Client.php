<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DateTime;
use App\Session;

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
     * Get the user that owns the client.
     */
    public function poc()
    {
        return $this->hasOne(Poc::class);
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
        $day = 'last ' . $this->session_day;
        $startDate = strtotime($this->start_date);
        $endDate = strtotime('today');

        $sessionDates = [];
        for ($x = strtotime($day, $endDate); $x >= $startDate; $x = strtotime('-1 week', $x)) {
            // $status = (count(Session::where('session_date', date('m-d-Y', $x))->get()) > 0) ? 'In Progress' : 'Outstanding';
            $status = $this->sessionStatus(date('l m-d-Y', $x));


            array_push($sessionDates, ['date' => date('l m-d-Y', $x), 'status' => $status]);
        }

        return array_slice($sessionDates, 0, 6);
    }

    /**
     * Generate past sessions expected for Client.
     * @param $session_date
     * format: date(m-d-Y, $date);
     * @return boolean
     */
    public function sessionStatus($sessionDate)
    {
        return (count($this->sessions()->where('session_date', $sessionDate)->get()) > 0) 
                                                        ? 'In Progress' : 
                                                        'Outstanding';
    }

    /**
     * Get all documentations through clients for this user.
     */
    public function documentations()
    {
        return $this->hasManyThrough('App\Documentation', 'App\Session');
    }
}
