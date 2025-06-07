import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { createActionsColumn, createDateColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Bookshelf, useBookshelves, useDeleteBookshelf } from '@/hooks/bookshelves/useBookshelves';
import { BookshelfLayout } from '@/layouts/bookshelves/BookshelfLayout';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function BookshelfIndex() {
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

    // Combine name and email filters into a single search string if they exist
    const combinedSearch = [
        filters.bookshelfNumber ? filters.bookshelfNumber : 'null',
        filters.floorNumber ? filters.floorNumber : 'null',
        filters.zoneName ? filters.zoneName : 'null',
        filters.booksCapacity ? filters.booksCapacity : 'null',
        filters.created_at ? filters.created_at : 'null',
    ];

    const {
        data: bookshelves,
        isLoading,
        isError,
        refetch,
    } = useBookshelves({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteBookshelfMutation = useDeleteBookshelf();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    const handleDeleteBookshelf = async (id: string) => {
        try {
            await deleteBookshelfMutation.mutateAsync(id);
            refetch();
            toast.success(t('ui.bookshelves.delete_dialog.success') || 'Bookshelf deleted successfully');
        } catch (error) {
            toast.error(t('ui.bookshelves.deleted_error') || 'Error deleting Zone');
            console.error('Error deleting Zone:', error);
        }
    };
    const columns = useMemo(
        () =>
            [
                createTextColumn<Bookshelf>({
                    id: 'bookshelfNumber',
                    header: t('ui.bookshelves.columns.bookshelfNumber') || 'bookshelfNumber',
                    accessorKey: 'bookshelfNumber',
                }),
                createTextColumn<Bookshelf>({
                    id: 'floorNumber',
                    header: t('ui.bookshelves.columns.floorNumber') || 'floorNumber',
                    accessorKey: 'floorNumber',
                }),
                createTextColumn<Bookshelf>({
                    id: 'zoneName',
                    header: t('ui.bookshelves.columns.zoneName') || 'zoneName',
                    accessorKey: 'zoneName',
                }),
                //   createTextColumn<Bookshelf>({
                //     id: "genre",
                //     header: t("ui.bookshelves.columns.genre") || "genre",
                //     accessorKey: "genre",
                //     format: (value) => t(`ui.genres.${value}`) || value
                //   }),
                createActionsColumn<Bookshelf>({
                    id: 'avaibleBooks',
                    header: t('ui.bookshelves.columns.avaibleBooks') || 'Available / Total',
                    renderActions: (bookshelf) => {
                        const isFull = bookshelf.booksCapacity === bookshelf.occupiedBooks;

                        const className = isFull
                            ? 'font-bold text-red-600 dark:text-red-400 px-2 py-1 rounded'
                            : 'font-bold text-green-600 dark:text-green-400 px-2 py-1 rounded';

                        return (
                            <span className={className}>
                                {bookshelf.occupiedBooks} / {bookshelf.booksCapacity}
                            </span>
                        );
                    },
                }),

                createDateColumn<Bookshelf>({
                    id: 'created_at',
                    header: t('ui.bookshelves.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createActionsColumn<Bookshelf>({
                    id: 'actions',
                    header: t('ui.bookshelves.columns.actions') || 'Actions',
                    renderActions: (bookshelf) => (
                        <>
                        {auth.permissions.bookshelves.edit && (
                            <Link href={`/bookshelves/${bookshelf.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button variant="outline" size="icon" title={t('ui.zones.buttons.edit') || 'Edit Zone'}>
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                            )}

                        {auth.permissions.bookshelves.delete && (
                            <DeleteDialog
                                id={bookshelf.id}
                                onDelete={handleDeleteBookshelf}
                                title={t('ui.bookshelves.delete.title') || 'Delete floor'}
                                description={
                                    t('ui.bookshelves.delete.description') ||
                                    'Are you sure you want to delete this zone? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.bookshelves.buttons.delete') || 'Delete floor'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                          )}
                        </>
                    ),
                }),
            ] as ColumnDef<Bookshelf>[],
        [t, handleDeleteBookshelf],
    );

    return (
        <BookshelfLayout title={t('ui.bookshelves.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.bookshelves.title')}</h1>
                        {auth.permissions.bookshelves.create && (
                        <Link href="/bookshelves/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.bookshelves.buttons.new')}
                            </Button>
                        </Link>
                        )}
                    </div>
                    <div></div>

                    <div className="w-full rounded-2xl border p-4 shadow-md">
                        <FiltersTable
                            filters={
                                [
                                    {
                                        id: 'bookshelfNumber',
                                        label: t('ui.bookshelves.filters.bookshelfNumber') || 'bookshelfNumber',
                                        type: 'number',
                                        placeholder: t('ui.bookshelves.placeholders.bookshelfNumber') || 'bookshelfNumber...',
                                    },
                                    {
                                        id: 'floorNumber',
                                        label: t('ui.bookshelves.filters.floorNumber') || 'floorNumber',
                                        type: 'number',
                                        placeholder: t('ui.bookshelves.placeholders.floorNumber') || 'floorNumber...',
                                    },
                                    {
                                        id: 'zoneName',
                                        label: t('ui.bookshelves.filters.zoneName') || 'zoneName',
                                        type: 'text',
                                        placeholder: t('ui.bookshelves.placeholders.zoneName') || 'zoneName...',
                                    },
                                    {
                                        id: 'booksCapacity',
                                        label: t('ui.bookshelves.filters.booksCapacity') || 'booksCapacity',
                                        type: 'number',
                                        placeholder: t('ui.bookshelves.placeholders.booksCapacity') || 'booksCapacity...',
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.bookshelves.filters.createdAt') || 'Select Date...',
                                        type: 'date',
                                        placeholder: t('ui.bookshelves.placeholders.createdAt') || 'created_at...',
                                        format: 'YYYY-MM-DD',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                        <div className="mt-2 text-right">
                            <span className="text-sm text-gray-500">{t('ui.common.results')}</span>
                            <span className="ml-1 font-bold text-blue-600">{bookshelves?.meta.total}</span>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={5} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.bookshelves.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.bookshelves.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        bookshelves ?? {
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
                                    noResultsMessage={t('ui.bookshelves.no_results') || 'No bookshelves found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BookshelfLayout>
    );
}
