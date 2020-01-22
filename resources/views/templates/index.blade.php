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
                                    <h4 class="text-center">{{ $template->name }}</h4>
                                    <span><strong>Last Updated</strong>: {{ \Carbon\Carbon::parse($template->updated_at)->format('m/d/Y') }}</span>
                                </div>

                                <div class="card-footer">
                                    <div class="row">
                                        <div class="col">
                                            <a href="/templates/{{ $template->id }}/edit" class="btn btn-primary btn-block">Edit</a>
                                        </div>
                                        <div class="col">
                                            <form action="/template/{{ $template->id }}" method="post">
                                                {{ csrf_field() }}
                                                {{ method_field('DELETE') }}

                                                <button class="btn btn-danger btn-block delete-template">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col mt-2">
                                            <button data-toggle="modal" data-target="#modal{{ $template->id }}" class="btn btn-success btn-block">Preview</button>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                    
                    {{-- BS4 Modal --}}
                    <div id="modal{{ $template->id }}" class="modal" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title"><strong>Template:</strong> {{ $template->name }}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                       {!! $template->template !!}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
                popover: {
                    image: [],
                    link: [],
                    air: []
                }
            });

            $('.delete-template').click(function(e) {
                e.preventDefault();

                const $form = $(this).parent('form')[0];
                
                bootbox.confirm({
                    message: "Are you sure you wish to delete this template?",
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (response) {
                        if (response) {
                            $form.submit();
                        }
                    }
                });
            });

        });
        </script>
    @endpush

@endsection