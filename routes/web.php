<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Users\Controllers\UserController::class);
    Route::resource('floors', \App\Floors\Controllers\FloorController::class);
    Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
    Route::resource('bookshelves', \App\Bookshelves\Controllers\BookshelfController::class);
    Route::resource('books', \App\Books\Controllers\BookController::class);
    Route::resource('searchBooks',\App\searchBooks\Controllers\SearchbookController::class);
    Route::resource('loans', \App\Loans\Controllers\LoanController::class);
    Route::resource('reservations', \App\Reservations\Controllers\ReservationController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

