<?php

namespace App\Floors\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorStoreAction;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class FloorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('floors/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $floorNumber = Floor::pluck('floorNumber')->toArray();
        $totalGenres = Genre::count();

        return Inertia::render('floors/Create', [
            'floorNumber' => $floorNumber,
            'totalGenres' => $totalGenres
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, FloorStoreAction $action)
    {
        $totalGenres = Genre::count();
        $validator = Validator::make($request->all(), [
            'floorNumber' => ['required', 'integer', 'unique:floors,floorNumber'],
            'floorName' => ['required', 'string', 'min:3'],
            'zonesCapacity' => ['required', 'integer', 'min:1', "max:$totalGenres"],[
                'floorNumber.unique' => 'El número de piso ya está en uso. Por favor elige otro.',
                'zonesCapacity.max' => "El valor de zonesCapacity no puede exceder el número total de géneros disponibles ($totalGenres).",
            ]
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('floors.index')
            ->with('success', __('messages.users.created'));

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Floor $floor)
    {
        return Inertia::render('floors/Edit', [
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);
        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }
}
