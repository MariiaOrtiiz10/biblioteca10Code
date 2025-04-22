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

}
