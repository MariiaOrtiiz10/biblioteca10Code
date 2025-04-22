<?php

use App\Bookshelves\Controllers\Api\BookshelfApiController;
use App\Users\Controllers\Api\UserApiController;
use App\Floors\Controllers\Api\FloorApiController;
use App\Zones\Controllers\Api\ZoneApiController;
use App\Books\Controllers\Api\BookApiController;
use App\Loans\Controllers\Api\LoanApiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/users', [UserApiController::class, 'index']);
    Route::get('/users/{user}', [UserApiController::class, 'show']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{user}', [UserApiController::class, 'update']);
    Route::delete('/users/{user}', [UserApiController::class, 'destroy']);
});

 Route::middleware(['web', 'auth'])->group(function () {
        Route::get('/floors', [FloorApiController::class, 'index']);
        Route::post('/floors', [FloorApiController::class, 'store']);
        Route::delete('/floors/{floor}', [FloorApiController::class, 'destroy']);
        Route::put('/floors/{floor}', [UserApiController::class, 'update']);
 });

 Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/zones', [ZoneApiController::class, 'index']);
    Route::delete('/zones/{zone}', [ZoneApiController::class, 'destroy']);

});

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/bookshelves', [BookshelfApiController::class, 'index']);
    Route::delete('/bookshelves/{bookshelf}', [BookshelfApiController::class, 'destroy']);

});

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/books', [BookApiController::class, 'index']);
    Route::delete('/books/{book}', [BookApiController::class, 'destroy']);
});


Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/loans', [LoanApiController::class, 'index']);
    Route::delete('/loans/{loan}', [LoanApiController::class, 'destroy']);
    //Route::put('loans/{loan}/return', [LoanApiController::class, 'return']);
});

