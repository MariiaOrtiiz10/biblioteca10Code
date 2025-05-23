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
        Schema::create('loans', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');;
            $table->foreignUuid('book_id')->constrained()->onDelete('cascade');;
            $table->date('start_date');
            $table->integer('loan_duration');
            $table->date('end_date')->nullable();
            $table->boolean('status')->default(true);
            $table->integer('delayed_days')->nullable();
            $table->date('returned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
