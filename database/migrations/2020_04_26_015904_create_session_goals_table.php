<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionGoalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session_goals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('session_id')->index();
            $table->smallInteger('goal_id')->index();
            $table->smallInteger('count')->default(0);
            $table->boolean('addressed')->default(1);
            $table->boolean('met_objective')->default(0);
            $table->longText('notes');

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
        Schema::dropIfExists('session_goals');
    }
}
