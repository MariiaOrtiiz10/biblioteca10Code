<?php
namespace Domain\Bookshelves\Actions;

use Carbon\Carbon;
use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookShelfIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        // Asignación segura con valores por defecto
        $bookshelfNumber = $search[0] ?? "null";
        $floorNumber = $search[1] ?? "null";
        $zoneName = $search[2] ?? "null";
        $booksCapacity = $search[3] ?? "null";
        $created_at = $search[4] ?? "null";

        $bookshelves = Bookshelf::query()
            ->join('zones', 'bookshelves.zone_id', '=', 'zones.id')
            ->join('floors', 'zones.floor_id', '=', 'floors.id')
            ->select('bookshelves.*')
            ->when($bookshelfNumber != "null", function ($query) use ($bookshelfNumber) {
                $query->where('bookshelves.bookshelfNumber', 'ILIKE', "%".$bookshelfNumber."%");
            })
            ->when($floorNumber != "null", function ($query) use ($floorNumber) {
                $query->where('floors.floorNumber', 'ILIKE', "%".$floorNumber."%");
            })
            ->when($zoneName != "null", function ($query) use ($zoneName) {
                $query->where('zones.zoneName', 'ILIKE', "%".$zoneName."%");
            })
            ->when($booksCapacity != "null", function ($query) use ($booksCapacity) {
                $query->where('bookshelves.booksCapacity', 'ILIKE', "%".$booksCapacity."%");
            })
            ->when($created_at != "null", function ($query) use ($created_at) {
                $query->whereDate('bookshelves.created_at', '=', Carbon::parse($created_at));
            })
            ->latest()
            ->paginate($perPage);

        return $bookshelves->through(fn ($bookshelf) => BookshelfResource::fromModel($bookshelf));
    }
}
