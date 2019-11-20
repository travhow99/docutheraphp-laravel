@extends('layouts.app')

@section('content')

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <form action="/" method="post">
                    <div class="form-group">
                        {{-- TODO: List $session attributes to be individually edited --}}
                        {{ $session }}
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div id="documentation"></div>
            </div>
        </div>

    </div>

    @push('scripts')
        <script>
        $(document).ready(function() {
            $('#documentation').summernote({
                height:300,
            });
        });
        </script>
    @endpush

@endsection