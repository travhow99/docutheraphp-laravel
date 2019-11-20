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
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($client->pastSessions() as $pSession)
                            <tr>
                                <td>
                                    {{ $pSession['date'] }}
                                </td>
                                <td>
                                    @if($pSession['status'] === 'Outstanding')
                                        <span class="text-danger">{{ $pSession['status'] }}</span>
                                    @else
                                        <span class="text-success">{{ $pSession['status'] }}</span>
                                    @endif
                                </td>
                                <td>
                                    <form class="d-inline" action="/clients/{{ $client->id }}/session" method="post">
                                        @csrf
                                        <input type="hidden" name="status" value="complete">
                                        <input type="hidden" name="session_date" value="{{ $pSession['date'] }}">
                                        <button href="" type="submit" class="btn btn-success">Occured</button>
                                    </form>
                                    <form class="d-inline" action="/clients/{{ $client->id }}/session" method="post">
                                        @csrf
                                        <input type="hidden" name="status" value="cancelled">
                                        <input type="hidden" name="session_date" value="{{ $pSession['date'] }}">
                                        <button href="" type="submit" class="btn btn-danger">Cancelled</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

    </div>

@endsection