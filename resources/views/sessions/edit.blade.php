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
                            <select name="template" id="template">
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
                        <textarea name="documentation" id="documentation">
                            @if ($session->documentation)
                                {!! $session->documentation->documentation !!}
                            @endif
                        </textarea>
                    </div>
                    <div class="d-flex flex-row-reverse">
                        <div id="card" data-title="My Title"></div>

                        <button class="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>

    </div>

    @push('scripts')
        <script>
        $(document).ready(function() {
            // Initialize editor
            $('#documentation').summernote({
                height:300,
                popover: {
                    image: [],
                    link: [],
                    air: []
                }
            });
            // Update template
            $('#template').change(function() {
                $('#documentation').summernote('destroy');
                $('#documentation').val({!! $templates !!}[$(this).val()].template);
                $('#documentation').summernote({
                    height:300,
                    popover: {
                        image: [],
                        link: [],
                        air: []
                    }
                });

            });

            // 
        });
        </script>
    @endpush

@endsection