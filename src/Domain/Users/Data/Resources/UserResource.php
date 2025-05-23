<?php

namespace Domain\Users\Data\Resources;

use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class UserResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $email,
        public readonly bool $has_loans,
        public readonly bool $has_reservations,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            has_loans: $user->loans()->exists(),
            has_reservations: $user->reservations()->withTrashed()->exists(),
            created_at: $user->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $user->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}
