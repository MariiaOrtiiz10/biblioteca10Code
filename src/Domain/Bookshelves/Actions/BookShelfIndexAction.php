<?php
namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookShelfIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $bookshelves = Bookshelf::with(['zone.floor', 'zone.genre'])
        ->when($search, function ($query, $search) {
            $query->where('bookshelfNumber', 'like', "%{$search}%")
                ->orWhereHas('zone.floor', fn($q) => $q->where('floorName', 'like', "%{$search}%"))
                ->orWhereHas('zone.genre', fn($q) => $q->where('genre', 'like', "%{$search}%"));
        })
        ->latest()
        ->paginate($perPage);
        return $bookshelves->through(fn ($bookshelf) => BookshelfResource::fromModel($bookshelf));
    }
}
