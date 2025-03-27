<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $floors = Floor::query()
            ->when($search, function ($query, $search) {
                $query->where('floorNumber', 'like', "%{$search}%")
                    ->orWhere('floorName', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    }
}
