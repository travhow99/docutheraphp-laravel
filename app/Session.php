<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['client_id', 'session_date', 'session_time', 'complete', 'cancelled', 'submitted', 'billed', 'notes'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['client_name'];

    /**
     * Return the client who owns the session.
     */
    public function client()
    {
        return $this->belongsTo('App\Session');
    }

    /**
     * Get the SessionGoals the Goal has.
     */
    public function sessionGoals()
    {
        return $this->hasMany('App\SessionGoal');
    }

    /**
     * Get the session's client name.
     */
    public function clientName()
    {
        return $this->client_id ? Client::clientNameFromId($this->client_id) : null;// Client::clientNameFromId($this->first()->client_id);
    }

    /**
     * Set the client name attribute.
     */
    public function getClientNameAttribute()
    {
        return $this->clientName();
    }

    /**
     * Get all of the session's attributes.
     */
    public function attributes()
    {
        return $this->morphMany('App\SessionAttribute', 'attributable');
    }

    /**
     * Get all of the session's attributes.
     */
    public function invoiceLineItem()
    {
        return $this->hasOne('App\InvoiceLineItem');
    }

}
