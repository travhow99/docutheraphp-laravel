@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="container-fluid">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        {{-- Current Clients --}}
        @if (count($clients) > 0)
            <div class="row">
                @foreach ($clients as $client)
                    <div class="col-6">

                        <div class="card">
                    
                                <div class="card-body">
                                    <h4 class="text-center">{{ $client->name }}</h4>
                                    <p>
                                        Session Day: <strong>{{ $client->session_day }}</strong><br>
                                        Session Time: <strong>{{ $client->session_time }}</strong><br>
                                        {{-- TODO: Calculate next session date --}}
                                        Next Session: <strong>10/24/2019</strong>
                                    </p>
                                </div>

                                <div class="card-footer">
                                    <button class="btn btn-primary btn-block">Manage</button>
                                </div>

                        </div>
                    </div>
                    @endforeach
            </div>
        @else
            <div class="row"><h1>New client</h1></div>
        @endif
    </div>

@endsection