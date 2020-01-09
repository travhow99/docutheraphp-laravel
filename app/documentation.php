<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Session;

class Documentation extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['session_id', 'documentation', 'session_goals'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the session that owns the documentation.
     */
    public function session()
    {
        return $this->belongsTo(Session::class);
    }
}
