<?php

namespace Domain\Users\Actions;

use App\Notifications\UpdateUserNotification;
use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;

class UserUpdateAction
{
    public function __invoke(User $user, array $data): UserResource
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        $user->update($updateData);
        $user->notify(new UpdateUserNotification($user));

        $user->syncPermissions($data['permissions']);

        return UserResource::fromModel($user->fresh());
    }
}
