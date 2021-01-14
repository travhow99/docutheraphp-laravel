<?php

namespace App\Http\Controllers\Api;

use App\InvoiceLineItem;
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
        $items = InvoiceLineItem::all();

        return response([
            'items' => $items,
        ], 200);
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
            'session_units' => 'required',
            'unit_cost' => 'required',
        ]);

        $invoice = Invoice::find($id);

        $InvoiceLineItem = $invoice->invoiceLineItems()->create([
            'session_id' => $request->session_id,
            'session_units' => $request->session_units,
            'unit_cost' => $request->unit_cost,
        ]);

        return response($InvoiceLineItem, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $InvoiceLineItem = InvoiceLineItem::find($id);

        return response($InvoiceLineItem, 200);
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

        $InvoiceLineItem = InvoiceLineItem::find($id);

        $InvoiceLineItem->fill($data);

        $InvoiceLineItem->save();

        return response('success', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $InvoiceLineItem = InvoiceLineItem::find($id);

        $InvoiceLineItem->delete();

        return response('success', 200);
    }
}
