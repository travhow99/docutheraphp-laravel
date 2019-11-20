@extends('layouts.app')

@section('content')

    {{-- Bootstrap Boilderplate --}}

    <div class="container-fluid">
        {{-- Display Validation Errors --}}
        @include('common.errors')

        {{-- Current Clients --}}
        @if (count($templates) > 0)
            <div class="row">
                @foreach ($templates as $template)
                    <div class="col-6">

                        <div class="card mb-4">
                    
                                <div class="card-body">
                                    <h4 class="text-center">{{ $template }}</h4>
                                    <p>
                                        Session Day: <strong>{{ $template }}</strong><br>
                                        Session Time: <strong>{{ $template }}</strong><br>
                                        {{-- TODO: Calculate next session date --}}
                                        Next Session: <strong>{{ $template }}</strong>
                                    </p>
                                </div>

                                <div class="card-footer">
                                    <div class="row">
                                        <div class="col">
                                            <a href="/templates/{{ $template->id }}/edit" class="btn btn-success btn-block">Manage</a>
                                        </div>
                                        <div class="col">
                                            <form action="/template/{{ $template->id }}" method="post">
                                                {{ csrf_field() }}
                                                {{ method_field('DELETE') }}

                                                <button class="btn btn-danger btn-block">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col mt-2">
                                            <a href="/templates/{{ $template->id }}/sessions" class="btn btn-primary btn-block">Sessions</a>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                    @endforeach
            </div>
        @else
            <div class="row"><h1>New Template</h1></div>
        @endif
            {{-- Add template form --}}
            <form action="/template" method="post">
                {{ csrf_field() }}

                {{-- Documentation Session Date --}}
                <div class="form-group">
                    <label for="name" class="col-3 control-label">Template Name</label>

                    <div class="col-6">
                        <input type="text" name="name" id="template-name" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="agency" class="col-3 control-label">Agency</label>

                    <div class="col-6">
                        <input type="text" name="agency" id="agency" name="agency" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="template" class="col-3 control-label">Template</label>

                    <div class="col-6">
                        <textarea name="template" id="template" class="form-control"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-6 ">
                        <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> Save Template</button>
                    </div>
                </div>

            </form>

    </div>

    @push('scripts')
        <script>
        $(document).ready(function() {
            $('#template').summernote({
                height:300,
            });
        });
        </script>
    @endpush

@endsection