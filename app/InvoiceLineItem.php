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
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['session'];

    /**
     * Get the owning invoice model.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    /**
     * Get the owning invoice model.
     */
    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    /**
     * Set the invoice_line_items attribute.
     */
    public function getSessionAttribute()
    {
        $session = $this->session();

        return $session->count() ? $session->get() : [];
    }
}
