<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    /**
     * Mass assignable attributes.
     * 
     * @var array
     */
    protected $fillable = ['client_id', 'invoice_name', 'invoice_details', 'agency', 'amount_billed', 'date_sent'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['invoice_line_items'];

    /**
     * Get the owning client model.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the InvoiceLineItems the Goal has.
     */
    public function invoiceLineItems()
    {
        return $this->hasMany(InvoiceLineItem::class);
    }

    /**
     * Set the invoice_line_items attribute.
     */
    public function getInvoiceLineItemsAttribute()
    {
        $items = $this->invoiceLineItems();
        
        return $items->count() ? $items : [];
    }
}
