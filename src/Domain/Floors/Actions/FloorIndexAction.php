<?php

namespace Domain\Floors\Actions;

use Carbon\Carbon;
use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        // Asignación segura con valores por defecto
        $floorNumber = $search[0] ?? "null";
        $floorName = $search[1] ?? "null";
        $zonesCapacity = $search[2] ?? "null";
        $created_at = $search[3] ?? "null";

        $floors = Floor::query()
            ->when($floorNumber != "null", function ($query) use ($floorNumber) {
                $query->where('floorNumber', 'ILIKE', "%".$floorNumber."%");
            })
            ->when($floorName != "null", function ($query) use ($floorName) {
                $query->where('floorName', 'ILIKE', "%".$floorName."%");
            })
            ->when($zonesCapacity != "null", function ($query) use ($zonesCapacity) {
                $query->where('zonesCapacity', 'ILIKE', "%".$zonesCapacity."%");
            })
            ->when($created_at != "null", function ($query) use ($created_at) {
                $query->whereDate('created_at', '=', Carbon::parse($created_at));
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    }
}
