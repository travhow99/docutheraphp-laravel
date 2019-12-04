@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="container-fluid">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        {{-- Current Clients --}}
        @if ($documentation)
            <div class="row">
                <div class="col">
                    <h3>{{ $documentation->session->session_date }}</h3>
                    {!! $documentation->documentation !!}
                </div>
            </div>
        @else
            <div class="row"><h1>New client</h1></div>
        @endif
            <div class="row">
                    <div class="col">
                    {{-- Add Client form --}}
                    <form action="/client" method="post">
                        {{ csrf_field() }}


                    </form>
                </div>
            </div>

    </div>

@endsection