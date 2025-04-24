<?php
namespace Domain\Zones\Actions;

use Carbon\Carbon;
use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {

        $zoneName = $search[0];
        $floorNumber = $search[1];
        $genre = $search[2];
        $bookshelvesCapacity = $search[3];
        $created_at = $search[4];

        $zones = Zone::query()
        ->join('floors', 'zones.floor_id', '=', 'floors.id')
        ->join('genres', 'zones.genre_id', '=', 'genres.id')
        ->select('zones.*')
        ->when($zoneName != "null", function ($query) use ($zoneName){
            $query->where('zones.zoneName', 'ILIKE', "%".$zoneName."%");
        })
        ->when($bookshelvesCapacity != "null", function ($query) use ($bookshelvesCapacity){
            $query->where('zones.bookshelvesCapacity', 'ILIKE', "%".$bookshelvesCapacity."%");
        })
        ->when($floorNumber != "null", function ($query) use ($floorNumber){
            $query->where('floors.floorNumber', 'ILIKE', "%".$floorNumber."%");
        })
        ->when($genre != "null", function ($query) use ($genre){
            $query->where('genres.genre', 'ILIKE', "%".$genre."%");
        })
        ->when($created_at != "null", function ($query) use ($created_at) {
            $query->whereDate('zones.created_at', '=', Carbon::parse($created_at));
        })
        ->latest()
        ->paginate($perPage);

        return $zones->through(fn ($zone) => ZoneResource::fromModel($zone));
    }
}
