<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Client;
use App\Documentation;

class Session extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['session_date', 'session_time', 'complete', 'cancelled', 'submitted', 'billed', 'notes'];

    /**
     * Get the client that owns the session.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the documentation for this session.
     */
    public function documentation()
    {
        return $this->hasOne(Documentation::class);
    }

    /**
     * Get the session id for that date.
     * @param Client $client
     */
    public static function single(Client $client, $date)
    {
        // $client = $this->client();
        return $client->sessions->where('session_date', $date)->first()->id;
    }
}