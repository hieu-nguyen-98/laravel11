<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calendars', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('user_id');
            $table->integer('label_id')->default(0)->comment('0: Business, 1: Holidays, 2: Events, 3: Personal');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->tinyInteger('status')->default(0)->comment('0: No, 1: Yes');
            $table->string('url')->nullable();
            $table->string('location')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendars');
    }
};
