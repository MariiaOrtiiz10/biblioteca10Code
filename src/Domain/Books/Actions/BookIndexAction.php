<?php
namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use PhpParser\Node\Stmt\ElseIf_;

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
        $floorNumber = $search[7];
        $zoneName = $search[8];
        $bookshelfNumber = $search[9];

        $books = Book::query()
        ->with(['loans'])
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
            if ($available === "true") {
                $query->where(function($q) {
                    $q->whereDoesntHave('loans') //no tiene prestamo el libro ->  AVAIBLE = TRUE.
                      ->orWhereHas('loans', function($subQ) {
                          $subQ->where('status', false); //tiene prestamos, pero status = false. AVAIBLE = TRUE.
                      });
                });
            } elseif ($available === "false") {
                $query->whereHas('loans', function($subQ) {
                    $subQ->where('status', true); // Caso 2: Tiene préstamos con status = true. AVAIBLE = False.
                });
            }
        })
        ->when($floorNumber != "null", function ($query) use ($floorNumber){
            $query->where('floors.floorNumber', 'ILIKE', "%".$floorNumber."%");
        })
        ->when($zoneName != "null", function ($query) use ($zoneName){
            $query->where('zones.zoneName', 'ILIKE', "%".$zoneName."%");
        })
        ->when($bookshelfNumber != "null", function ($query) use ($bookshelfNumber){
            $query->where('bookshelves.bookshelfNumber', 'ILIKE', "%".$bookshelfNumber."%");
        })
        ->latest()
        ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
