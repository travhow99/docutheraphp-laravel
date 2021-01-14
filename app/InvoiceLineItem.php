<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceLineItem extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['invoice_id', 'session_id', 'session_units', 'unit_cost'];

    /**
     * Get the owning invoice model.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

}
