<?php

namespace App\Charts\Controllers;

use App\Core\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChartZoneController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('charts/zones', [

        ]);
    }
}
