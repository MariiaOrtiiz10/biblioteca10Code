<?php

namespace App\Users\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Models\Loan;
use Domain\Permissions\Models\Permission;
use Domain\Users\Actions\UserDestroyAction;
use Domain\Users\Actions\UserIndexAction;
use Domain\Users\Actions\UserStoreAction;
use Domain\Users\Actions\UserUpdateAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Domain\Roles\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('users.view');
        return Inertia::render('users/Index', [

        ]);
    }

        public function show(User $user)
    {
        Gate::authorize('users.timeline');
        $loans = $user->loans()->with('book')->orderBy('start_date')->get();
        $reservations = $user->reservations()->withTrashed()->with('book')->orderBy('created_at')->get();
        return Inertia::render('users/Timeline', [
            'user' => $user,
            'loans' => $loans,
            'reservations' => $reservations,
        ]);
    }

    public function create()
    {
        Gate::authorize('users.create');
        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'display_name' => $role->display_name,
                'permissions' => $role->permissions->pluck('name')
            ];
        });

        $permissions = Permission::all()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });
        $usersData = User::get()->toArray();


        return Inertia::render('users/Create', [
            'roles' => $roles,
            'permissions' => $permissions,
            'usersData'=>$usersData,
        ]);
    }



    public function store(Request $request, UserStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'permissions' => ['array'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());
        return redirect()->route('users.index')
            ->with('success', __('messages.users.created'));
    }

    public function edit(Request $request, User $user)
    {
        Gate::authorize('users.edit');
        $permissionNames = $user->getPermissionNames();
        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'display_name' => $role->display_name,
                'permissions' => $role->permissions->pluck('name')
            ];
        });

        $permissions = Permission::all()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });
        $usersData = User::get()->toArray();
        return Inertia::render('users/Edit', [
            'user' => $user,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'permissionNames' => $permissionNames,
            'roles' => $roles,
            'permissions' => $permissions,
            'usersData'=>$usersData,
        ]);
    }

    public function update(Request $request, User $user, UserUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8'],
            'permissions' => ['array']
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($user, $validator->validated());

        if ($request->has('permissions')) {
            $user->syncPermissions($request->permissions);
        }

        $redirectUrl = route('users.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.users.updated'));
    }

    public function destroy(User $user, UserDestroyAction $action)
    {
        Gate::authorize('users.delete');
        $action($user);
        return redirect()->route('users.index')
            ->with('success', __('messages.users.deleted'));
    }
}
