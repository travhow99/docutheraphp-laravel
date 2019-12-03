<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('client_id')->index();
            $table->date('session_date');
            $table->time('session_time');
            $table->bigInteger('documentation')->nullable();
            $table->boolean('complete')->default(false);
            $table->boolean('cancelled')->default(false);
            $table->boolean('submitted')->default(false);
            $table->boolean('billed')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
