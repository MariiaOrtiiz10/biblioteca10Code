<?php

use App\Charts\Controllers\ChartBookController;
use App\Charts\Controllers\ChartUserController;
use App\Charts\Controllers\ChartZoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('booksCharts', [ChartBookController::class, 'index']);
    Route::get('usersCharts', [ChartUserController::class, 'index']);
    Route::get('zonesCharts', [ChartZoneController::class, 'index']);

});
