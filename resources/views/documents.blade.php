@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="panel-body">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        {{-- New Documentation --}}
        <form action="/document" method="post">
            {{ csrf_field() }}
            {{ Auth::user()->name }}

            {{-- Documentation Session Date --}}
            <div class="form-group">
                <label for="session_date" class="col-3 control-label">Session Date</label>

                <div class="col-6">
                    <input type="datetime-local" name="session_date" id="sessionDate" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="documentation" class="col-3 control-label">Documentation</label>

                <div class="col-6">
                    <input type="text" name="documentation" id="documentation" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <div class="col-offset-3 col-6">
                    <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> Save Documentation</button>
                </div>
            </div>

        </form>

    </div>

    {{-- TODO: Past Documentation --}}
    @if (count($sessions) > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Recent Documentation
            </div>

            <div class="panel-body">
                <table class="table table-striped document-table">
                    <thead>
                        <th>Client ID</th>
                        <th>Session Date</th>
                        <th>Documentation</th>
                        <th>&nbsp;</th>
                    </thead>

                    <tbody>
                        @foreach ($sessions as $session)
                            <tr>
                                <td class="table-text">
                                    <div>{{ $session->$client_id }}</div>
                                </td>
                                <td>
                                    <div>{{ $session->$session_date }}</div>
                                </td>
                                <td>
                                    <div>{{ $session->$documentation }}</div>
                                </td>
                                <td>
                                    {{-- TODO: Delete Button --}}
                                    {{-- Or Send, print buttons? --}}
                                    <form action="/document/{{ $session->id }}" method="POST">
                                        {{ csrf_field() }}
                                        {{ method_field('DELETE') }}
                            
                                        <button>Delete Session</button>
                                    </form>                            
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
@endsection