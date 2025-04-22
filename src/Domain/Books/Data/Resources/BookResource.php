<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $floor_id,
        public readonly string $floorName,
        public readonly int $floorNumber,
        public readonly string $zone_id,
        public readonly string $zoneName,
        public readonly string $genre,
        public readonly string $bookshelf_id,
        public readonly int $bookshelfNumber,
        public readonly string $isbn,
        public readonly string $title,
        public readonly string $author,
        public readonly string $editorial,
        public readonly int $pages,
        public readonly string $genres,
        public readonly bool $available,
        public readonly string $availableBookIsbn,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Book $book): self
    {
        $totalBookIsbn = Book::where('isbn', $book->isbn)->count();

        $availableBook = Book::where('isbn', $book->isbn)
            ->whereDoesntHave('loans', function ($query) {
                $query->where('status', true);
            })
            ->count();

        return new self(
            id: $book->id,
            floor_id:$book->bookshelf->zone->floor_id,
            floorName: $book->bookshelf->zone->floor->floorName,
            floorNumber:$book->bookshelf->zone->floor->floorNumber,
            zone_id: $book->bookshelf->zone_id,
            zoneName:$book->bookshelf->zone->zoneName,
            genre: $book->bookshelf->zone->genre->genre,
            bookshelf_id:$book->bookshelf_id,
            bookshelfNumber:$book->bookshelf->bookshelfNumber,
            isbn: $book->isbn,
            title: $book->title,
            author: $book->author,
            editorial: $book->editorial,
            pages: $book->pages,
            genres: $book->genres,
            available: !$book->loans()->where('status', true)->exists(),
            availableBookIsbn: "$availableBook / $totalBookIsbn",
            created_at: $book->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}

