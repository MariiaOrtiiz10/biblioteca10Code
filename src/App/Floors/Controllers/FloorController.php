<?php

namespace App\Floors\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Floors\Data\Resources\FloorResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
        $floorsData = Floor::get()->toArray();
        return Inertia::render('floors/Create', [
            'floorsData' => $floorsData,
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floorNumber' => ['required', 'integer', 'unique:floors,floorNumber'],
            'floorName' => ['required', 'string', 'min:3', 'unique:floors,floorName'],
            'zonesCapacity' => ['required', 'integer', 'min:0'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.created'));

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Floor $floor)
    {
        $floorsData =  Floor::get()->toArray();
        return Inertia::render('floors/Edit', [
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'floorsData' => $floorsData,
        ]);

    }
    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floorNumber' => ['required', 'integer',
            Rule::unique('floors')->where(fn ($query) =>
                $query->where('floorNumber', $request->floor_id)
            )->ignore($request->id)
        ],
            'floorName' => ['required', 'string', 'min:3',
            Rule::unique('floors')->where(fn ($query) =>
            $query->where('floorName', $request->floor_id)
            )->ignore($request->id) ],
            'zonesCapacity' => ['required', 'integer', 'min:0',
            Rule::when($floor->occupiedZones > 0, [
                function ($value, $fail) use ($floor) {
                    if ($value < $floor->occupiedZones) {
                        $fail("La capacidad no puede ser menor que las zonas ocupadas ($floor->occupiedZones).");
                    }
                }
            ])
            ]
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($floor, $validator->validated());
        $redirectUrl = route('floors.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.floors.updated'));

    }

    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);
        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }
}
