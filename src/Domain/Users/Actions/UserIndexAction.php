<?php

namespace Domain\Users\Actions;

use Carbon\Carbon;
use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;

class UserIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $name = $search[0];
        $email = $search[1];
        $created_at = $search[2];

        $users = User::query()
        ->when($name != "null", function ($query) use ($name){
            $query->where('name', 'ILIKE', "%".$name."%");
        })
        ->when($email != "null", function ($query) use ($email){
            $query->where('email', 'ILIKE', "%".$email."%");
        })
        ->when($created_at != "null", function ($query) use ($created_at) {
            $query->whereDate('created_at', '=', Carbon::parse($created_at));
        })
        ->latest()
        ->paginate($perPage);

        return $users->through(fn ($user) => UserResource::fromModel($user));
    }
}
