<?php
namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookShelfIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $bookshelfNumber= $search[0];
        $floorNumber = $search[1];
        $zoneName= $search[2];
        $booksCapacity = $search[3];
        $bookshelves = Bookshelf::query()
        ->join('zones', 'bookshelves.zone_id', '=', 'zones.id')
        ->join('floors', 'zones.floor_id', '=', 'floors.id')
        ->select('bookshelves.*', 'floors.floorNumber')
        ->when($bookshelfNumber != "null", function ($query) use ($bookshelfNumber){
            $query->where('bookshelves.bookshelfNumber', 'ILIKE', "%".$bookshelfNumber."%");
        })
        ->when($floorNumber != "null", function ($query) use ($floorNumber){
            $query->where('floors.floorNumber', 'ILIKE', "%".$floorNumber."%");
        })
        ->when($zoneName != "null", function ($query) use ($zoneName){
            $query->where('zones.zoneName', 'ILIKE', "%".$zoneName."%");
        })
        ->when($booksCapacity != "null", function ($query) use ($booksCapacity){
            $query->where('bookshelves.booksCapacity', 'ILIKE', "%".$booksCapacity."%");
        })
        ->latest()
        ->paginate($perPage);
        return $bookshelves->through(fn ($bookshelf) => BookshelfResource::fromModel($bookshelf));
    }
}
