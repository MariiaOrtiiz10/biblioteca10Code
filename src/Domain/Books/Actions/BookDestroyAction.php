<?php

namespace Domain\Books\Actions;

use Domain\Books\Models\Book;
use Illuminate\Http\JsonResponse;

class BookDestroyAction
{
    public function __invoke(Book $book): void
    {

        $book->delete();
    }
}
