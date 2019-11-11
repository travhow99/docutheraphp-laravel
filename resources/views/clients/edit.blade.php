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
                                                <option value="" selected>Select a Day</option>
                                                <option value="Monday" {{ $client->session_day === "Monday" ? "selected" : ""}}>Monday</option>
                                                <option value="Tuesday" {{ $client->session_day === "Tuesday" ? "selected" : ""}}>Tuesday</option>
                                                <option value="Wednesday" {{ $client->session_day === "Monday" ? "selected" : ""}}>Monday</option>
                                                <option value="Thursday" {{ $client->session_day === "Thursday" ? "selected" : ""}}>Thursday</option>
                                                <option value="Friday" {{ $client->session_day === "Friday" ? "selected" : ""}}>Friday</option>
                                            </select>
                                        </div>

                                        <div class="col">
                                            <label for="session_time">Session Time</label>
                                            <input type="time" name="session_time" id="session_time" class="form-control" value="{{ $client->session_time }}">
                                        </div>
                                    </div>

                                    {{-- TODO: Dropdown list of populated Agencies --}}
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
                                    <div class="col mt-2">
                                        {{-- TODO: Contact Info --}}
                                        <a class="btn btn-outline-info btn-block" href="/client/{{ $client->id }}/contact">Contact Info</a>
                                    </div>
                                    <div class="col mt-2">
                                        {{-- TODO: Discontinue Method --}}
                                            <form action="/client/{{ $client->id }}" method="post">
                                                {{ csrf_field() }}
    
                                                <button class="btn btn-outline-danger btn-block">Discontinue</button>
                                            </form>
                                        </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        @endif

    </div>

@endsection