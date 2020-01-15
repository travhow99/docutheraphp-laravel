@extends('layouts.app')

@section('content')

    <div class="container-fluid">
        @if ($client)
            <h3>POC for {{ $client->name }}</h3>
            
        @endif
        {{-- Add contact form --}}
        <form action="/poc" method="post">
            {{ csrf_field() }}

            {{-- Documentation Session Date --}}
            <div class="form-group">
                <label for="name" class="col-3 control-label">Contact Name</label>

                <div class="col-6">
                    <input type="text" name="contact_name" id="contact-name" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="agency" class="col-3 control-label">Contact Email</label>

                <div class="col-6">
                    <input type="email" name="email" id="email" name="email" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="contact" class="col-3 control-label">Phone Number</label>

                <div class="col-6">
                    <input type="tel" name="phone_number" id="phone_number" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="contact" class="col-3 control-label">Additional Notes</label>

                <div class="col-6">
                    <textarea name="notes" id="notes" class="form-control"></textarea>
                </div>
            </div>

            <input type="hidden" name="client_id" value="{{ $client->id }}">

            <div class="form-group">
                <div class="col-6 ">
                    <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> Save Contact</button>
                </div>
            </div>

        </form>

    </div>
    
@endsection
