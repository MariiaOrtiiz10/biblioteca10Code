<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorStoreAction
{
    public function __invoke(array $data): FloorResource
    {
        $floor = Floor::create([
            'floorNumber' => $data['floorNumber'],
            'floorName' => $data['floorName'],
            'zonesCapacity' => $data['zonesCapacity'],
        ]);

        return FloorResource::fromModel($floor);
    }
}
