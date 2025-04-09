<?php

namespace Domain\Bookshelves\Data\Resources;

use Domain\Bookshelves\Models\Bookshelf;
use Spatie\LaravelData\Data;

class BookshelfResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $zone_id,
        public readonly string $zoneName,
        public readonly string $floor_id,
        public readonly string $floorName,
        public readonly int $floorNumber,
        public readonly string $genre,
        public readonly int $bookshelfNumber,
        public readonly int $booksCapacity,
        public readonly int $occupiedBooks,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Bookshelf $bookshelf): self
    {
        return new self(
            id: $bookshelf->id,
            zone_id: $bookshelf->zone_id,
            zoneName:$bookshelf->zone->zoneName,
            floor_id: $bookshelf->zone->floor->id,
            floorName: $bookshelf->zone->floor->floorName,
            floorNumber: $bookshelf->zone->floor->floorNumber,
            genre: $bookshelf->zone->genre->genre,
            bookshelfNumber: $bookshelf->bookshelfNumber,
            booksCapacity: $bookshelf->booksCapacity,
            occupiedBooks: $bookshelf->books()-> count(),
            created_at: $bookshelf->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $bookshelf->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}
