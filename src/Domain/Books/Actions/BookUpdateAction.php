<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Symfony\Component\HttpFoundation\FileBag;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data, FileBag $files): BookResource
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
        $genreNames = explode(', ', $data['genres'] ?? '');
        $genreIds = Genre::whereIn('genre', $genreNames)->pluck('id')->toArray();
        $book->genres()->sync($genreIds);

        $book->update($updateData);

        foreach ($files as $file) {
            $book->getMedia('images')[0]->delete();
            $book->addMedia($file)->toMediaCollection('images', 'images');
        }

        return BookResource::fromModel($book->fresh());
    }
}
