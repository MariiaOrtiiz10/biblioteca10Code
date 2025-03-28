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
        Schema::create('zones', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('floor_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('genre_id')->constrained();
            $table->integer('bookshelvesCapacity');
            $table->timestamps();
            $table->unique(['floor_id', 'genre_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zones');
    }
};
