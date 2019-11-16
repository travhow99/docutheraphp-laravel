@extends('layouts.app')

@section('content')

    <div class="container-fluid">

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