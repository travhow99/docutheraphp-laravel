@extends('layouts.app')

@section('content')

    <div class="container-fluid">
        @if ($client)
            <h3>Contact Info for {{ $client->name }}</h3>
            
        @endif
        {{-- Add contact form --}}
        <form action="/poc" method="post">
            {{ csrf_field() }}
            <input type="hidden" name="client_id" value="{{ $client->id }}">
            <input type="hidden" name="poc_id" value="{{ $poc->id ?? null }}">

            {{-- Documentation Session Date --}}
            <div class="form-group">
                <label for="name" class="col-3 control-label">Contact Name</label>

                <div class="col-12">
                    <input type="text" name="contact_name" id="contact-name" class="form-control" value="{{ $poc->contact_name ?? '' }}">
                </div>
            </div>

            <div class="form-group">
                <label for="agency" class="col-3 control-label">Contact Email</label>

                <div class="col-12">
                    <input type="email" name="email" id="email" name="email" class="form-control" value="{{ $poc->email ?? '' }}">
                </div>
            </div>

            <div class="form-group">
                <label for="contact" class="col-3 control-label">Phone Number</label>

                <div class="col-12">
                    <input type="tel" name="phone_number" id="phone_number" class="form-control" value="{{ $poc->phone_number ?? '' }}">
                </div>
            </div>

            <div class="form-group">
                <label for="contact" class="col-3 control-label">Additional Notes</label>

                <div class="col-12">
                    <textarea name="notes" id="notes" class="form-control">
                        {{ $poc->notes ?? '' }}
                    </textarea>
                </div>
            </div>

            <div class="form-group">
                <div class="col-12 ">
                    <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> Save Contact</button>
                </div>
            </div>

        </form>

    </div>

    @push('scripts')
        <script>
            $(document).ready(function() {
                $('#notes').summernote({
                    height:300,
                    popover: {
                        image: [],
                        link: [],
                        air: []
                    }
                });
            });
        </script>
    @endpush
    
@endsection
