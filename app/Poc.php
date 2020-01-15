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

}
