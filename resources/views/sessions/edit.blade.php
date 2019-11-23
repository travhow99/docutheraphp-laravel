@extends('layouts.app')

@section('content')

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <form action="/" method="post">
                    <div class="form-group">
                        {{-- TODO: List $session attributes to be individually edited --}}
                        {{ $session->client()->first()->name }}
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div>{{ $session->session_date }}</div>
                        <div>{{ $session->session_time }}</div>
                        <div><strong>Billed</strong>: {{ $session->billed === '0' ? 'No' : 'Yes' }}</div>

                    </div>
                </div>
            </div>
            <div class="col-9">
                <div id="documentation"></div>
            </div>
        </div>

    </div>

    @push('scripts')
        <script>
        $(document).ready(function() {
            $('#documentation').summernote({
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