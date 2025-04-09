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
        Schema::create('bookshelves', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('zone_id')->constrained()->onDelete('cascade');
            $table->integer('bookshelfNumber')->unique();
            $table->integer('booksCapacity');
            $table->integer('occupiedBooks')->default(0);
            $table->timestamps();
            $table->unique(['zone_id', 'bookshelfNumber']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookshelves');
    }
};
