@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="container-fluid">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        <div class="row">
            <div class="col">
                <h3>New Session</h3>
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