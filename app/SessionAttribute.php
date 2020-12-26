<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SessionAttribute extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['name', 'attribute', 'attributable_id', 'attributable_type'];

    /**
     * Get the owning attributable model.
     */
    public function attributable()
    {
        return $this->morphTo();
    }
}
