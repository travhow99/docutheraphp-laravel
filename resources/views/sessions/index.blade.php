@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="container-fluid">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        <div class="row">
            <div class="col">
                <h3>Sessions for {{ $client->name }}</h3>
                <p>Next session: {{ $client->nextSession() }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div id="card" data-title="My Title"></div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div id="entry"></div>
            </div>
        </div>

    </div>

    @push('scripts')
        <script>
        $(document).ready(function() {
            $('#entry').summernote({
                height:300,
            });
        });
        </script>
    @endpush

@endsection