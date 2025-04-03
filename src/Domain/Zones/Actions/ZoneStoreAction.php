<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneStoreAction
{
    public function __invoke(array $data): ZoneResource
    {
        $zone = Zone::create([
            'zoneName' => $data['zoneName'],
            'floor_id' => $data['floor_id'],
            'genre_id' => $data['genre_id'],
            'bookshelvesCapacity' => $data['bookshelvesCapacity'],
        ]);

        return ZoneResource::fromModel($zone);
    }
}
