<?php

namespace Domain\Floors\Data\Resources;

use Domain\Floors\Models\Floor;
use Spatie\LaravelData\Data;

class FloorResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $floorNumber,
        public readonly string $floorName,
        public readonly int $zonesCapacity,
        public readonly ?int $occupiedZones,
        public readonly string $avaibleZones,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Floor $floor): self
    {
        return new self(
            id: $floor->id,
            floorNumber: $floor->floorNumber,
            floorName: $floor->floorName,
            zonesCapacity: $floor->zonesCapacity,
            occupiedZones: $floor->occupiedZones,
            avaibleZones: "$floor->occupiedZones / $floor->zonesCapacity",
            created_at: $floor->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $floor->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}
