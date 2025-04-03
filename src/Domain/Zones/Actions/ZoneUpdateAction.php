<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;


class ZoneUpdateAction
{
    public function __invoke(Zone $zone, array $data): ZoneResource
    {
        $updateData = [
            'zoneName' => $data['zoneName'],
            'floor_id' => $data['floor_id'],
            'genre_id' => $data['genre_id'],
            'bookshelvesCapacity'=> $data['bookshelvesCapacity'],
        ];

        $zone->update($updateData);

        return ZoneResource::fromModel($zone->fresh());
    }
}
