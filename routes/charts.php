<?php

use App\Charts\Controllers\ChartBookController;
use App\Charts\Controllers\ChartUserController;
use App\Charts\Controllers\ChartZoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('charts/books', [ChartBookController::class, 'index']);
    Route::get('charts/users', [ChartUserController::class, 'index']);
    Route::get('charts/zones', [ChartZoneController::class, 'index']);

});
