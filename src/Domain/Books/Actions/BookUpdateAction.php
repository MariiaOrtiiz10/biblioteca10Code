<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;


class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [
            'isbn' => $data['isbn'],
            'title' => $data['title'],
            'author' => $data['author'],
            'editorial' =>  $data['editorial'],
            'pages' =>  $data['pages'],
            'genres' =>  $data['genres'],
            'bookshelf_id' =>  $data['bookshelf_id'],
        ];

        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
