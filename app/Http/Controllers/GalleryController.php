<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        // Pass existing images to the view
        return Inertia::render('gallery/index', [
            'items' => Gallery::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validate
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);

        // 2. Handle File Upload
        $path = null;
        if ($request->hasFile('image')) {
            // Stores in storage/app/public/galleries
            $path = $request->file('image')->store('galleries', 'public');
        }

        // 3. Create Record
        Gallery::create([
            'title' => $request->title,
            'image_path' => $path,
        ]);

        return redirect()->route('gallery.index');
    }
}