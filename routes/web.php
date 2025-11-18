<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\GalleryController;

use Illuminate\Support\Facades\Response;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('gallery', GalleryController::class);
});


Route::get('/storage/{path}', function ($path) {
    // Hanapin ang file sa storage/app/public
    $filePath = storage_path('app/public/' . $path);

    // Kung wala ang file, mag-404
    if (! file_exists($filePath)) {
        abort(404);
    }

    // I-serve ang file nang may tamang headers
    return response()->file($filePath);
})->where('path', '.*'); // Ang '.*' ay para payagan ang mga subfolders (hal: galleries/image.png)

require __DIR__.'/settings.php';
