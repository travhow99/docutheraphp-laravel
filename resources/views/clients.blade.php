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
            {{-- Add Client form --}}
            <form action="/client" method="post">
                {{ csrf_field() }}

                {{-- Documentation Session Date --}}
                <div class="form-group">
                    <label for="name" class="col-3 control-label">Client Name</label>

                    <div class="col-6">
                        <input type="text" name="name" id="client-name" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="agency" class="col-3 control-label">Agency</label>

                    <div class="col-6">
                        <input type="text" name="agency" id="agency" name="agency" class="form-control">
                    </div>
                </div>

{{--                 <div class="form-group">
                    <label for="documentation" class="col-3 control-label">Documentation</label>

                    <div class="col-6">
                        <input type="text" name="documentation" id="documentation" class="form-control">
                    </div>
                </div> --}}

                <div class="form-group">
                    <div class="col-6 ">
                        <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> Save Client</button>
                    </div>
                </div>

            </form>

    </div>

@endsection