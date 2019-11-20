<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['name', 'agency', 'template'];

    /**
     * Get the user that owns the template.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
