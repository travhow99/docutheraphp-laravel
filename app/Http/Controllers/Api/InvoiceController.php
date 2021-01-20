<?php

namespace App\Http\Controllers\Api;

use App\Client;
use App\Invoice;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $invoices = Invoice::all();

        // Get the related line items
        foreach ($invoices as $i) {
            $i->invoice_line_items = $i->invoiceLineItems();
        }

        return response($invoices, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'invoice_name' => 'required',
            'agency' => 'required',
        ]);

        $client = Client::find($id);

        $invoice = $client->invoices()->create([
            'invoice_name' => $request->invoice_name,
            'invoice_details' => $request->invoice_details,
            'agency' => $request->agency,
        ]);

        $invoice->invoice_line_items = $invoice->invoiceLineItems();

        return response($invoice, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $invoice = Invoice::find($id);

        return response($invoice, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Request()->all();

        $invoice = Invoice::find($id);

        $invoice->fill($data);

        $invoice->save();

        return response('success', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $client_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($client_id, $id)
    {
        $invoice = Invoice::find($id);

        $invoice->delete();

        return response('success', 200);
    }
}
