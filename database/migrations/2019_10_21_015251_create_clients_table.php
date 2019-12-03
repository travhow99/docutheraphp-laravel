<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->index();
            $table->string('name');
            $table->bigInteger('poc')->nullable();
            $table->string('address')->nullable();
            $table->string('session_day')->nullable();
            $table->string('session_time')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->string('agency');
            $table->boolean('active')->default(1);
            $table->string('diagnosis');
            $table->longText('approach')->nullable();
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
        Schema::dropIfExists('clients');
    }
}
