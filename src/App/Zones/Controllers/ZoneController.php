<?php

namespace App\Zones\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use App\Rules\FloorHasCapacity;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('zones/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $floorsData = Floor::select(['id','floorNumber','floorName','zonesCapacity', 'occupiedZones'])->orderBy("floorNumber","asc")->get()->toArray();
        $genresData = Genre::select(['id','genre'])->orderBy("genre","asc")->get()->toArray();
        //$zoneNameByFloorsNumber = Zone::select(['zones.zoneName', 'floors.floorNumber', 'zones.floor_id'])->join('floors', 'floors.id', '=', 'zones.floor_id')->orderBy("floorNumber","asc")->get()->toArray();
        $zonesData = Zone::select(['id', 'zoneName', 'floor_id', 'occupiedBookshelves'])->get()->toArray();

        return Inertia::render('zones/Create',[
            'floorsData' => $floorsData,
            'genresData' => $genresData,
            'zonesData' => $zonesData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ZoneStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'zoneName' => ['required', 'string', 'min:3',
            Rule::unique('zones')->where(function ($query) use ($request) {
                return $query->where('floor_id', $request->floor_id);
            }),
         ],
             'floor_id' => ['required'],
             'genre_id' => ['required'],
             'bookshelvesCapacity' => ['required', 'integer', 'min:0', ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Zone $zone)
    {
        $floorsData = Floor::select(['id','floorNumber','floorName', 'zonesCapacity', 'occupiedZones'])->orderBy("floorNumber","asc")->get()->toArray();
        $genresData = Genre::select(['id','genre'])->orderBy("genre","asc")->get()->toArray();
        $zonesData = Zone::select(['id', 'zoneName', 'floor_id', 'occupiedBookshelves'])->get()->toArray();
        //$zoneNameByFloorsNumber = Zone::select(['zones.zoneName', 'floors.floorNumber', 'zones.floor_id'])->join('floors', 'floors.id', '=', 'zones.floor_id')->orderBy("floorNumber","asc")->get()->toArray();
        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'floorsData' => $floorsData,
            'genresData' => $genresData,
            'zonesData' => $zonesData,
            //'zoneNameByFloorsNumber' => $zoneNameByFloorsNumber,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zone $zone,  ZoneUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'zoneName' => ['required', 'string', 'min:3',
            Rule::unique('zones','zoneName')
            ->where(fn($query) => $query->where('floor_id', $request->floor_id))
            ->ignore($zone->id),
            ],
            'floor_id' => ['required', 'exists:floors,id'],
            'genre_id' => ['required', 'exists:genres,id' ],
            'bookshelvesCapacity' => ['required', 'integer', 'min:0',
             Rule::when($zone->occupiedBookshelves > 0, [
                function ($value, $fail) use ($zone) {
                    if ($value < $zone->occupiedBookshelves) {
                        $fail("La capacidad no puede ser menor que las estanterías ocupadas ($zone->occupiedBookshelves).");
                    }
                }
            ])],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($zone, $validator->validated());
        $redirectUrl = route('zones.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {

        $action($zone);
        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
}
