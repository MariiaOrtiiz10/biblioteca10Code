<?php

namespace App\Http\Controllers;

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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Domain\Roles\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('users.view');
        return Inertia::render('users/Index');
    }

    public function create()
    {
        Gate::authorize('users.create');
         $role = Role::all();
         $arrayRolePermissions=[];
        foreach($role as $rol){
            foreach($rol->permissions as $perm){
                array_push($arrayRolePermissions, [$rol->name, $perm->name]);
            }
        }
        return Inertia::render('users/Create', ["arrayRolePermissions"=> $arrayRolePermissions]);
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
        return Inertia::render('users/Edit', [
            'user' => $user,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function show(Request $request, User $user){

    }

    public function update(Request $request, User $user, UserUpdateAction $action)
    {
        Gate::authorize('users.edit');
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
