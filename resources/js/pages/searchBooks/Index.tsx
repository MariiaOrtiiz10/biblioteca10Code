import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Book, useDeleteBook, useSearchBook } from '@/hooks/books/useSearchBook';
import { useTranslations } from '@/hooks/use-translations';
import { SearchBookLayout } from '@/layouts/books/searchBookLayout';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, BookUp, PencilIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DeleteDialog } from '@/components/stack-table';

interface IndexBookProps extends PageProps {
    floors: {
        id: string;
        floorNumber: number;
    }[];
    zones: {
        id: string;
        zoneName: string;
    }[];
    bookshelves: {
        id: string;
        bookshelfNumber: number;
    }[];
}

export default function SearchBookIndex({ floors, zones, bookshelves }: IndexBookProps) {
    const { t } = useTranslations();
    const { url } = usePage();
    const { auth } = usePage().props;

    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});

    const combinedSearch = [
        filters.isbn ? filters.isbn : 'null',
        filters.title ? filters.title : 'null',
        filters.author ? filters.author : 'null',
        filters.editorial ? filters.editorial : 'null',
        filters.pages ? filters.pages : 'null',
        filters.genres ? filters.genres : 'null',
        filters.available ? filters.available : 'null',
        filters.floorNumber ? filters.floorNumber : 'null',
        filters.zoneName ? filters.zoneName : 'null',
        filters.bookshelfNumber ? filters.bookshelfNumber : 'null',
    ];

    const {
        data: books,
        isLoading,
        isError,
        refetch,
    } = useSearchBook({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteBookMutation = useDeleteBook();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    function handleCreateLoan(isbn: string) {
        router.get(`loans/create`, { isbn });
    }

    function handleCreateReservation(isbn: string) {
        router.get(`reservations/create`, { isbn });
    }

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.Book.deleted_error') || 'Error deleting Book');
            console.error('Error deleting Book:', error);
        }
    };
    const columns = useMemo(
        () =>
            [
                createTextColumn<Book>({
                    id: 'isbn',
                    header: t('ui.books.columns.isbn') || 'isbn',
                    accessorKey: 'isbn',
                }),
                createTextColumn<Book>({
                    id: 'title',
                    header: t('ui.books.columns.title') || 'title',
                    accessorKey: 'title',
                }),
                createTextColumn<Book>({
                    id: 'floorNumber',
                    header: t('ui.books.columns.floorNumber') || 'floorNumber',
                    accessorKey: 'floorNumber',
                }),
                createTextColumn<Book>({
                    id: 'zoneName',
                    header: t('ui.books.columns.zoneName') || 'zoneName',
                    accessorKey: 'zoneName',
                }),
                createTextColumn<Book>({
                    id: 'bookshelfNumber',
                    header: t('ui.books.columns.bookshelfNumber') || 'bookshelfNumber',
                    accessorKey: 'bookshelfNumber',
                }),
                createTextColumn<Book>({
                    id: 'available',
                    header: t('ui.books.columns.available') || 'available',
                    accessorKey: 'available',
                    format: (value) => (value ? t('ui.books.available') : t('ui.books.notAvailable')),
                }),
                createTextColumn<Book>({
                    id: 'availableBookIsbn',
                    header: t('ui.books.columns.availableBookIsbn') || 'Available / Total',
                    accessorKey: 'availableBookIsbn',
                }),

                createActionsColumn<Book>({
                    id: 'actions',
                    header: t('ui.books.columns.actions') || 'Actions',
                    renderActions: (book) => (
                        <>
                            {(auth.permissions.loans.create) && (book.available) && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title={t('ui.books.buttons.loan') || 'Loan Book'}
                                    onClick={() => handleCreateLoan(book.isbn)}
                                >
                                    <ArrowUpDown className="h-4 w-4 text-orange-500" />
                                </Button>
                            )}
                            {(auth.permissions.reservations.create) && (!book.available) && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title={t('ui.books.buttons.reserve') || 'Reserve Book'}
                                    onClick={() => handleCreateReservation(book.isbn)}
                                >
                                    <BookUp className="h-5 w-5 text-blue-500" />
                                </Button>
                            )}

                            {auth.permissions.books.edit && (
                                <Link href={`/books/${book.id}/edit?page=${currentPage} &perPage=${perPage}`}>
                                    <Button variant="outline" size="icon" title={t('ui.books.buttons.edit') || 'Edit Book'}>
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}

                            {auth.permissions.books.delete &&
                                (book.available ? (
                                    <DeleteDialog
                                        id={book.id}
                                        onDelete={handleDeleteBook}
                                        title={t('ui.books.delete.title') || 'Delete Book'}
                                        description={
                                            t('ui.books.delete.description') ||
                                            'Are you sure you want to delete this book? This action cannot be undone.'
                                        }
                                        trigger={
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                title={t('ui.books.buttons.delete') || 'Delete Book'}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                ) : (
                                    <div title={t('ui.books.buttons.noDelete') || 'Book is not available'}>
                                        <Button variant="outline" size="icon" className="text-muted-foreground cursor-not-allowed" disabled>
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                        </>
                    ),
                }),
            ] as ColumnDef<Book>[],
        [t, handleDeleteBook],
    );

    return (
        <SearchBookLayout title={t('ui.searchBooks.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.searchBooks.title')}</h1>
                    </div>
                    <div></div>

                    <div className="w-full rounded-2xl border p-4 shadow-md">
                        <FiltersTable
                            filters={
                                [
                                    {
                                        id: 'isbn',
                                        label: t('ui.books.filters.isbn') || 'isbn',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.isbn') || 'isbn...',
                                    },
                                    {
                                        id: 'title',
                                        label: t('ui.books.filters.title') || 'title',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.title') || 'title...',
                                    },
                                    {
                                        id: 'available',
                                        label: t('ui.books.filters.available') || 'available',
                                        type: 'select',
                                        options: [
                                            { value: 'true', label: t('ui.books.available') || 'Available' },
                                            { value: 'false', label: t('ui.books.notAvailable') || 'Available' },
                                        ],
                                        placeholder: t('ui.books.placeholders.available') || 'available',
                                    },
                                    {
                                        id: 'floorNumber',
                                        label: t('ui.books.filters.floors') || 'floors',
                                        type: 'select',
                                        options: floors.map((floor) => ({
                                            label: floor.floorNumber,
                                            value: floor.floorNumber,
                                        })),
                                        placeholder: t('ui.books.placeholders.floors') || 'floors...',
                                    },
                                    {
                                        id: 'zoneName',
                                        label: t('ui.books.filters.zones') || 'zones',
                                        type: 'select',
                                        options: Array.from(
                                            new Map(zones.map((zone) => [zone.zoneName, { label: zone.zoneName, value: zone.zoneName }])).values(),
                                        ),
                                        placeholder: t('ui.books.placeholders.zones') || 'zones...',
                                    },
                                    {
                                        id: 'bookshelfNumber',
                                        label: t('ui.books.filters.bookshelves') || 'zones',
                                        type: 'select',
                                        options: bookshelves.map((bookshelf) => ({
                                            label: bookshelf.bookshelfNumber,
                                            value: bookshelf.bookshelfNumber,
                                        })),
                                        placeholder: t('ui.books.placeholders.zones') || 'zones...',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                        <div className="mt-2 text-right">
                            <span className="text-sm text-gray-500">{t('ui.common.results')}</span>
                            <span className="ml-1 font-bold text-blue-600">{books?.meta.total}</span>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={5} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.books.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        books ?? {
                                            data: [],
                                            meta: {
                                                current_page: 1,
                                                from: 0,
                                                last_page: 1,
                                                per_page: perPage,
                                                to: 0,
                                                total: 0,
                                            },
                                        }
                                    }
                                    columns={columns}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                    perPageOptions={[10, 25, 50, 100]}
                                    noResultsMessage={t('ui.books.no_results') || 'No books found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SearchBookLayout>
    );
}
