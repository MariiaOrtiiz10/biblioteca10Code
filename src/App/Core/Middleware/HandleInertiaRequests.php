<?php

namespace App\Core\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        $permissions = $request->user() ? $request->user()->permissions->pluck('name')->toArray() : null;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
                'permissions' => [
                    'users' => [
                        'view' => $request->user() ? in_array('users.view',$permissions) : null,
                        'timeline' => $request->user() ? in_array('users.timeline',$permissions) : null,
                        'create' => $request->user() ? in_array('users.create', $permissions): null,
                        'edit' => $request->user() ? in_array('users.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('users.delete', $permissions) : null,
                    ],
                    'floors' => [
                        'view' => $request->user() ? in_array('floors.view',$permissions) : null,
                        'create' => $request->user() ? in_array('floors.create', $permissions): null,
                        'edit' => $request->user() ? in_array('floors.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('floors.delete', $permissions) : null,
                    ],
                     'zones' => [
                        'view' => $request->user() ? in_array('zones.view',$permissions) : null,
                        'create' => $request->user() ? in_array('zones.create', $permissions): null,
                        'edit' => $request->user() ? in_array('zones.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('zones.delete', $permissions) : null,
                     ],
                     'bookshelves' => [
                        'view' => $request->user() ? in_array('bookshelves.view',$permissions) : null,
                        'create' => $request->user() ? in_array('bookshelves.create', $permissions): null,
                        'edit' => $request->user() ? in_array('bookshelves.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('bookshelves.delete', $permissions) : null,
                     ],
                     'books' => [
                        'view' => $request->user() ? in_array('books.view',$permissions) : null,
                        'searchBooks'=> $request->user() ? in_array('books.searchBooks',$permissions) : null,
                        'create' => $request->user() ? in_array('books.create', $permissions): null,
                        'edit' => $request->user() ? in_array('books.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('books.delete', $permissions) : null,
                     ],
                     'loans' => [
                        'view' => $request->user() ? in_array('loans.view',$permissions) : null,
                        'create'=> $request->user() ? in_array('loans.create',$permissions) : null,
                        'edit' => $request->user() ? in_array('loans.edit', $permissions): null,
                        'return' => $request->user() ? in_array('loans.return', $permissions) : null,
                        'delete' => $request->user() ? in_array('loans.delete', $permissions) : null,
                     ],
                     'reservations' => [
                        'view' => $request->user() ? in_array('reservations.view',$permissions) : null,
                        'create'=> $request->user() ? in_array('reservations.create',$permissions) : null,
                        'record' => $request->user() ? in_array('reservations.record',$permissions): null,
                     ],

                      'view' => [
                        'users' => $request->user() ? in_array('view.users',$permissions) : null,
                     ],

                     'statistics' => [
                        'view' => $request->user() ? in_array('statistics.view',$permissions) : null,
                     ],

                      'settings' => [
                        'access' => $request->user() ? in_array('settings.access',$permissions) : null,
                        'modify'=> $request->user() ? in_array('settings.modify',$permissions) : null,
                     ],
                ],

            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'translations' => [
                'ui' => trans('ui'),
                'messages' => trans('messages'),
            ],
        ];
    }
}
