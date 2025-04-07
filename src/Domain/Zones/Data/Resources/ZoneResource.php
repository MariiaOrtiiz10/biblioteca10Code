<?php

namespace Domain\Zones\Data\Resources;


use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $zoneName,
        public readonly string $floor_id,
        public readonly string $floorName,
        public readonly int $floorNumber,
        public readonly string $genre_id,
        public readonly string $genre,
        public readonly int $bookshelvesCapacity,
        public readonly int $occupiedBookshelves,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Zone $zone): self
    {
        return new self(
            id: $zone->id,
            zoneName: $zone->zoneName,
            floor_id: $zone->floor_id,
            floorName:$zone->floor->floorName,
            floorNumber:$zone->floor->floorNumber,
            genre_id: $zone->genre_id,
            genre:$zone->genre->genre,
            bookshelvesCapacity:$zone->bookshelvesCapacity,
            occupiedBookshelves:$zone -> bookshelves()-> count(),
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
