<?php
namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $zones = Zone::with(['floor', 'genre'])
        ->when($search, function ($query, $search) {
            $query->where('zoneName', 'like', "%{$search}%")
                ->orWhereHas('floor', fn($q) => $q->where('floorNumber', 'like', "%{$search}%"))
                ->orWhereHas('genre', fn($q) => $q->where('genre', 'like', "%{$search}%"));
        })
        ->latest()
        ->paginate($perPage);
        return $zones->through(fn ($zone) => ZoneResource::fromModel($zone));
    }
}
