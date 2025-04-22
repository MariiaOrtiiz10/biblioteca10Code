<?php

namespace Domain\Books\Actions;

use Domain\Books\Models\Book;
use Illuminate\Http\JsonResponse;

class BookDestroyAction
{
    public function __invoke(Book $book): JsonResponse|string
    {
        $isAvailable = !$book->loans()->where('status', true)->exists();

        if (!$isAvailable) {
            return false;
        }

        $book->delete();
        return true;
    }
}
