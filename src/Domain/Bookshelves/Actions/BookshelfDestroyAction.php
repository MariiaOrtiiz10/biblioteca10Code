<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Models\Bookshelf;

class BookshelfDestroyAction
{
    public function __invoke(Bookshelf $bookshelf): void
    {
        $bookshelf->delete();
    }
}
