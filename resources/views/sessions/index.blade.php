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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($client->pastSessions() as $pSession)
                            <tr>
                                <td>
                                    {{ $pSession['date'] }}
                                </td>
                                <td>
                                    {{ $pSession['status'] }}
                                </td>
                                <td></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

    </div>

@endsection