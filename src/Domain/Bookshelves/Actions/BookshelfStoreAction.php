<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookshelfStoreAction
{
    public function __invoke(array $data): BookshelfResource
    {
        $bookshelf = Bookshelf::create([
            'bookshelfNumber' => $data['bookshelfNumber'],
            'zone_id' => $data['zone_id'],
            'booksCapacity' => $data['booksCapacity'],
        ]);

        return BookshelfResource::fromModel($bookshelf);
    }
}
