<?php

namespace Domain\Users\Actions;

use App\Notifications\DeleteUserNotification;
use Domain\Users\Models\User;

class UserDestroyAction
{
    public function __invoke(User $user): void
    {
        $user->delete();
        $user->notify(new DeleteUserNotification($user));
    }
}
