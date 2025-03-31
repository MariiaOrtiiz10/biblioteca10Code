<?php

namespace App\Floors\Controllers\Api;

use App\Core\Controllers\Controller;
use Illuminate\Http\Request;
use Domain\Floors\Actions\FloorIndexAction;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Models\Floor;
use Illuminate\Support\Facades\Validator;
use Domain\Genres\Models\Genre;

class FloorApiController extends Controller{

    public function index(Request $request, FloorIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }
    public function show(Floor $floor)
    {
        //
    }
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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $floor = $action($validator->validated());

        return response()->json([
            'message' => __('messages.floors.created'),
            'floor' => $floor
        ]);
    }

    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return response()->json([
            'message' => __('messages.users.deleted')
        ]);
    }
}
