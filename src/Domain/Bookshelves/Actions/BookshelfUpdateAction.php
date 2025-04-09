<?php

namespace Domain\Bookshelves\Actions;


use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;


class BookshelfUpdateAction
{
    public function __invoke(Bookshelf $bookshelf, array $data): BookshelfResource
    {
        $updateData = [
            'bookshelfNumber' => $data['bookshelfNumber'],
            'zone_id' => $data['zone_id'],
            'booksCapacity' => $data['booksCapacity'],
        ];

        $bookshelf->update($updateData);

        return BookshelfResource::fromModel($bookshelf->fresh());
    }
}
