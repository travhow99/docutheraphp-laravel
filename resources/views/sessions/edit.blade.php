@extends('layouts.app')

@section('content')

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <form action="/" method="post">
                    <div class="form-group">
                        {{-- TODO: List $session attributes to be individually edited --}}
                        {{ $session->client()->first()->name }}
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div><strong>Date</strong>: {{ $session->session_date }}</div>
                        <div><strong>Time</strong>: {{ $session->session_time }}</div>
                        <div><strong>Billed</strong>: {{ $session->billed === '0' ? 'No' : 'Yes' }}</div>
                        <div>
                            <strong>Template</strong>: 
                            <select name="template" id="template" class="form-control">
                                <option value="none" selected disabled>Choose a Template</option>
                                @foreach ($templates as $key=>$template)
                                    <option value="{{ $key }}">{{ $template->name }}</option>            
                                @endforeach
                            </select>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="col-9">
                <form action="/session/{{ $session->id }}/documentation" method="post">
                    {{ csrf_field() }}
                    <div class="form-group">
                        <textarea name="documentation" id="documentation" style="display: none;">
                            @if ($session->documentation)
                                {!! $session->documentation->documentation !!}
                            @endif
                        </textarea>
                    </div>
                    <div class="d-flex flex-row-reverse">
                        <button class="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>

    </div>

    @push('scripts')
        <script>
        $(document).ready(function() {
            const summernoteConfig = {
                height:300,
                popover: {
                    image: [],
                    link: [],
                    air: []
                }
            };
            // Initialize editor
            $('#documentation').summernote(summernoteConfig);
            // Update template
            $('#template').change(function() {
                // if ($('#documentation').summernote('code').trim() === '') return;

                const $_this = $(this);
                bootbox.confirm({
                    message: "This is a confirm with custom button text and color! Do you like it?",
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
                            return response;
                        }
                    }
                });
            });

            // 
        });
        </script>
    @endpush

@endsection