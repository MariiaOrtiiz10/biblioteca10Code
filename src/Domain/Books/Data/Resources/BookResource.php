<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $zone_id,
        public readonly string $zoneName,
        public readonly string $floor_id,
        public readonly string $floorName,
        public readonly int $floorNumber,
        public readonly string $genre,
        public readonly string $bookshelf_id,
        public readonly int $bookshelfNumber,
        public readonly string $name,
        public readonly string $editorial,
        public readonly int $pages,
        public readonly string $genres,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Book $book): self
    {
        return new self(
            id: $book->id,
            zone_id: $book->bookshelf->zone->id,
            bookshelf_id->$book->bookshelf_id,
            floor_id:$book->bookshelf->zone->floor->id,
            name: $book->name,
            editorial: $book->editorial,
            pages: $book->pages,
            genres: $book->genres,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}

