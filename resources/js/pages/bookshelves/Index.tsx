import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";

import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Table } from "@/components/stack-table/Table";
import { useBookshelves , Bookshelf, useDeleteBookshelf } from "@/hooks/bookshelves/useBookshelves";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";


export default function BookshelfIndex() {
  const { t } = useTranslations();
  const { url } = usePage();

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
      filters.search,
      filters.floorName ? `floorName:${filters.floorName}` : null,
      filters.genre ? `genre:${filters.genre}` : null,
    ].filter(Boolean).join(' ');

    const { data: bookshelves, isLoading, isError, refetch } = useBookshelves({
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

      const handleDeleteBookshelf = async (id: string) => {
        try {
          await deleteBookshelfMutation.mutateAsync(id);
          refetch();
        } catch (error) {
          toast.error(t("ui.bookshelves.deleted_error") || "Error deleting Zone");
          console.error("Error deleting Zone:", error);
        }
      };
      const columns = useMemo(() => ([

        createTextColumn<Bookshelf>({
            id: "bookshelfNumber",
            header: t("ui.bookshelves.columns.bookshelfNumber") || "bookshelfNumber",
            accessorKey: "bookshelfNumber",
          }),
        createTextColumn<Bookshelf>({
            id: "floorNumber",
            header: t("ui.bookshelves.columns.floorNumber") || "floorNumber",
            accessorKey: "floorNumber",
          }),
        createTextColumn<Bookshelf>({
            id: "zoneName",
            header: t("ui.bookshelves.columns.zoneName") || "zoneName",
            accessorKey: "zoneName",
          }),
        //   createTextColumn<Bookshelf>({
        //     id: "genre",
        //     header: t("ui.bookshelves.columns.genre") || "genre",
        //     accessorKey: "genre",
        //   }),

          createTextColumn<Bookshelf>({
            id: "booksCapacity",
            header: t("ui.bookshelves.columns.booksCapacity") || "booksCapacity",
            accessorKey: "booksCapacity",
          }),
          createDateColumn<Bookshelf>({
            id: "created_at",
            header: t("ui.bookshelves.columns.created_at") || "Created At",
            accessorKey: "created_at",
          }),
          createActionsColumn<Bookshelf>({
            id: "actions",
            header: t("ui.bookshelves.columns.actions") || "Actions",
            renderActions: (zone) => (
              <>
                <Link href={`/bookshelves/${zone.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                  <Button variant="outline" size="icon" title={t("ui.zones.buttons.edit") || "Edit Zone"}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteDialog
                  id={zone.id}
                  onDelete={handleDeleteBookshelf}
                  title={t("ui.bookshelves.delete.title") || "Delete floor"}
                  description={t("ui.bookshelves.delete.description") || "Are you sure you want to delete this zone? This action cannot be undone."}
                  trigger={
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.bookshelves.buttons.delete") || "Delete floor"}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  }
                />
              </>
            ),
          }),
        ] as ColumnDef<Bookshelf>[]), [t, handleDeleteBookshelf]);



  return (
     <BookshelfLayout title={t('ui.bookshelves.title')}>
              <div className="p-6">
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h1 className="text-3xl font-bold">{t('ui.bookshelves.title')}</h1>
                          <Link href="/bookshelves/create">
                              <Button>
                                  <PlusIcon className="mr-2 h-4 w-4" />
                                  {t('ui.bookshelves.buttons.new')}
                              </Button>
                          </Link>
                      </div>
                      <div></div>

                      <div className="space-y-4">
                          <FiltersTable
                              filters={
                                  [
                                      {
                                          id: 'search',
                                          label: t('ui.bookshelves.filters.search') || 'Buscar',
                                          type: 'text',
                                          placeholder: t('ui.bookshelves.placeholders.search') || 'Buscar...',
                                      },
                                      {
                                          id: 'floorName',
                                          label: t('ui.bookshelves.filters.floorName') || 'floorName',
                                          type: 'text',
                                          placeholder: t('ui.bookshelves.placeholders.floorName') || 'floorName...',
                                      },
                                      {
                                          id: 'genre',
                                          label: t('ui.bookshelves.filters.genre') || 'genre',
                                          type: 'text',
                                          placeholder: t('ui.bookshelves.placeholders.genre') || 'genre...',
                                      },

                                  ] as FilterConfig[]
                              }
                              onFilterChange={setFilters}
                              initialValues={filters}
                          />
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
