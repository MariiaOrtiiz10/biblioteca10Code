<?php

namespace App\Zones\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Zones\Actions\ZoneIndexAction;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Illuminate\Http\Request;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Validator;

class ZoneApiController extends Controller{
    public function index(Request $request, ZoneIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        $action($zone);
        return response()->json([
            'message' => __('messages.zones.deleted')
        ]);
    }
    public function store(Request $request, ZoneStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'zoneName' => ['required', 'string', 'min:3'],

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $zone = $action($validator->validated());

        return response()->json([
            'message' => __('messages.floors.created'),
            'zone' => $zone
        ]);
    }
}
