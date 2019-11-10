@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="container-fluid">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        {{-- Current Clients --}}
        @if (count($client) > 0)
            <div class="row">
                    <div class="col">

                        <div class="card">
                
                            <div class="card-body">
                                <h4 class="text-center">{{ $client->name }}</h4>
                                <form action="/client/{{ $client->id }}" method="post">
                                    @csrf
                                    @method('PATCH')                                
                                
                                    <div class="form-group row">
                                        <div class="col">
                                            <label for="session_day">Session Day</label>    
                                            {{-- TODO: show selected from DB --}}
                                            <select name="session_day" id="session_day" class="form-control">
                                                <option value="">Select a Day</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                            </select>
                                        </div>

                                        <div class="col">
                                            <label for="session_time">Session Time</label>
                                            <input type="time" name="session_time" id="session_time" class="form-control" value="{{ $client->session_time }}">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="agency">Agency</label>    
                                        <input type="text" name="agency" id="agency" class="form-control" value="{{ $client->agency }}">
                                    </div>                                    

                                    <div class="form-group">
                                        <label for="start_date">Start Date</label>    
                                        <input type="date" name="start_date" id="start_date" class="form-control" value="{{ $client->start_date }}">
                                    </div>          
                                    
                                    <button class="btn btn-primary btn-block" type="submit">Update</button>
    
                                </form>

                            </div>

                            <div class="card-footer">
                                <div class="row">
                                    <div class="col">
                                        <button class="btn btn-primary btn-block">Update</button>
                                    </div>
                                    <div class="col">
                                        <form action="/client/{{ $client->id }}" method="post">
                                            {{ csrf_field() }}

                                            <button class="btn btn-danger btn-block">Delete</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col mt-2">
                                        <button class="btn btn-secondary btn-block">Deactivate</button>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        @endif

    </div>

@endsection