<?php

namespace App\Floors\Controllers\Api;

use App\Core\Controllers\Controller;
use Illuminate\Http\Request;
use Domain\Floors\Actions\FloorIndexAction;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Models\Floor;


class FloorApiController extends Controller{

    public function index(Request $request, FloorIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }
    public function show(Floor $floor)
    {
        //
    }
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return response()->json([
            'message' => __('messages.users.deleted')
        ]);
    }
}
