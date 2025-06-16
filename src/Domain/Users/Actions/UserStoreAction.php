<?php

namespace Domain\Users\Actions;

use App\Notifications\NewUserNotification;
use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Notifications\Notify;

class UserStoreAction
{
    public function __invoke(array $data): UserResource
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $user ->notify(new NewUserNotification($user));
        $user->syncPermissions($data['permissions']);
        return UserResource::fromModel($user);
    }
}
