<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SessionAttribute extends Model
{
    /**
     * Get the owning attributable model.
     */
    public function attributable()
    {
        return $this->morphTo();
    }
}
