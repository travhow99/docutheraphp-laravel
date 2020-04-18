<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poc extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['client_id', 'contact_name', 'email', 'phone_number', 'notes'];

    /**
     * Get the client that owns the poc.
     */
    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    /**
     * Get the user that owns the poc's client.
     */
/*     public function user()
    {
        return $this->
    } */
}
