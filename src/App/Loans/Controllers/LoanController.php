<?php

namespace App\Loans\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Loans\Models\Loan;
use Inertia\Inertia;
use Inertia\Response;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('loans/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('loans/Create');
    }

}
