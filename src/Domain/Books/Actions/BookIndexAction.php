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
        $available = $search[5];

        $books = Book::query()
        ->when($isbn != "null", function ($query) use ($isbn){
            $query->where('isbn', 'ILIKE', "%".$isbn."%");
        })
        ->when($title != "null", function ($query) use ($title){
            $query->where('title', 'ILIKE', "%".$title."%");
        })
        ->when($author != "null", function ($query) use ($author){
            $query->where('author', 'ILIKE', "%".$author."%");
        })
        ->when($editorial != "null", function ($query) use ($editorial){
            $query->where('editorial', 'ILIKE', "%".$editorial."%");
        })
        ->when($pages != "null", function ($query) use ($pages){
            $query->where('pages', 'ILIKE', "%".$pages."%");
        })
        ->when($available != "null", function ($query) use ($available) {
            if ($available === "true") {
                // Libros disponibles (sin préstamos activos)
                $query->whereDoesntHave('loans', function ($subQuery) {
                    $subQuery->where('status', true);
                });
            } else {
                // Libros no disponibles (con préstamos activos)
                $query->whereHas('loans', function ($subQuery) {
                    $subQuery->where('status', true);
                });
            }
        })
        ->latest()
        ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
