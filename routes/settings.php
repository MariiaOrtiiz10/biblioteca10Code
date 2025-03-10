<?php

use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\Settings\LanguageController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/password');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', [AppearanceController::class, 'edit'])->name('settings.appearance');
    Route::put('settings/appearance', [AppearanceController::class, 'update'])->name('settings.appearance.update');

    Route::get('settings/languages', [LanguageController::class, 'edit'])->name('languages.edit');
    Route::put('settings/languages', [LanguageController::class, 'update'])->name('languages.update');
});
