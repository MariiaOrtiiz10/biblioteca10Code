<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;

class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {
        $book = Book::create([
            'isbn' => $data['isbn'],
            'title' => $data['title'],
            'author' => $data['author'],
            'editorial' =>  $data['editorial'],
            'pages' =>  $data['pages'],
            'genres' =>  $data['genres'],
            'bookshelf_id' =>  $data['bookshelf_id'],

        ]);

        return BookResource::fromModel($book);
    }
}
