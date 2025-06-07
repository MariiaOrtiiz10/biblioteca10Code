<?php

namespace App\Bookshelves\Controllers;


use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Bookshelves\Actions\BookshelfDestroyAction;
use Domain\Bookshelves\Actions\BookshelfStoreAction;
use Domain\Bookshelves\Actions\BookshelfUpdateAction;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class BookshelfController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('bookshelves.view');
        return Inertia::render('bookshelves/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('bookshelves.create');
        $floorsData = Floor::get()->toArray();
        $zonesData = Zone::with(['genre'])->get()->toArray();
        $bookshelvesData = Bookshelf::get()->toArray();
         return Inertia::render('bookshelves/Create',[
            'floorsData' => $floorsData,
            'zonesData' => $zonesData,
            'bookshelvesData' => $bookshelvesData,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BookshelfStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'bookshelfNumber' => ['required', 'integer', 'min:0', 'unique:bookshelves,bookshelfNumber'],
            'zone_id' => ['required'],
            'booksCapacity' => ['required', 'integer', 'min:0'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('bookshelves.index')
            ->with('success', __('messages.bookshelves.created'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Bookshelf $bookshelf)
    {
        Gate::authorize('bookshelves.edit');
        $floorsData = Floor::get()->toArray();
        $zonesData = Zone::with(['genre','bookshelves'])->get()->toArray();
        $bookshelvesData = Bookshelf::get()->toArray();
         return Inertia::render('bookshelves/Edit',[
            'bookshelf' => $bookshelf,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'floorsData' => $floorsData,
            'zonesData' => $zonesData,
            'bookshelvesData' => $bookshelvesData,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookshelf $bookshelf, BookshelfUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'bookshelfNumber' => ['required', 'integer', 'min:0',
            Rule::unique('bookshelves')->where(fn ($query) =>
            $query->where('bookshelfNumber', $request->bookshelf_id)
        )->ignore($request->id)
        ],
            'zone_id' => ['required'],
            'booksCapacity' => ['required', 'integer', 'min:0'],
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($bookshelf, $validator->validated());
        $redirectUrl = route('bookshelves.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.bookshelves.updated'));


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookshelf $bookshelf, BookshelfDestroyAction $action)
    {
        Gate::authorize('bookshelves.delete');
        $action($bookshelf);
        return redirect()->route('bookshelves.index')
            ->with('success', __('messages.bookshelves.deleted'));
    }
}
