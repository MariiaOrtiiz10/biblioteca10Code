<?php
namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;

class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $isbn = $search[0];
        $title= $search[1];
        $author= $search[2];
        $editorial= $search[3];
        $pages= $search[4];
        $genres= $search[5];
        $available = $search[6];

        $books = Book::query()
        ->join('bookshelves', 'books.bookshelf_id', '=', 'bookshelves.id')
        ->join('zones', 'bookshelves.zone_id', '=', 'zones.id')
        ->join('floors', 'zones.floor_id', '=', 'floors.id')
        ->select('books.*')
        ->when($isbn != "null", function ($query) use ($isbn){
            $query->where('books.isbn', 'ILIKE', "%".$isbn."%");
        })
        ->when($title != "null", function ($query) use ($title){
            $query->where('books.title', 'ILIKE', "%".$title."%");
        })
        ->when($author != "null", function ($query) use ($author){
            $query->where('books.author', 'ILIKE', "%".$author."%");
        })
        ->when($editorial != "null", function ($query) use ($editorial){
            $query->where('books.editorial', 'ILIKE', "%".$editorial."%");
        })
        ->when($pages != "null", function ($query) use ($pages){
            $query->where('books.pages', 'ILIKE', "%".$pages."%");
        })
        ->when($genres != "null", function ($query) use ($genres){
            $query->where('books.genres', 'ILIKE', "%".$genres."%");
        })
        ->when($available != "null", function ($query) use ($available) {

        })
        ->latest()
        ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
