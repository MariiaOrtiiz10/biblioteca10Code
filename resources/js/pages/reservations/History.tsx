import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, router, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, Undo2, ChevronUp, History } from "lucide-react";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Table } from "@/components/stack-table/Table";
import axios from "../../lib/axios";
import { ReservationLayout } from "@/layouts/reservations/ReservationLayout";
import { useHistory, Reservation } from "@/hooks/reservations/useHistory";


export default function HistoryIndex() {
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
        // filters.isbn ? filters.isbn:"null",
        // filters.email ? filters.email:"null",
        // filters.title ? filters.title:"null",
    ]

    const { data: reservations , isLoading, isError, refetch } = useHistory({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
      });

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };



      const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
      };


      const columns = useMemo(() => ([

          createTextColumn<Reservation>({
            id: "email",
            header: t("ui.reservations.columns.email") || "email",
            accessorKey: "email",
          }),
          createTextColumn<Reservation>({
            id: "isbn",
            header: t("ui.reservations.columns.isbn") || "isbn",
            accessorKey: "isbn",
          }),
          createTextColumn<Reservation>({
            id: "title",
            header: t("ui.reservations.columns.title") || "title",
            accessorKey: "title",
          }),
          createTextColumn<Reservation>({
            id: "deleted_at",
            header: t("ui.reservations.columns.deleted_at") || "deleted_at",
            accessorKey: "deleted_at",
          }),

        ] as ColumnDef<Reservation>[]), [t]);



  return (
     <ReservationLayout title={t('ui.history.title')}>
              <div className="p-6">
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h1 className="text-3xl font-bold">{t('ui.history.title')}</h1>
                          <Link href="/reservations">
                                    <Button>
                                         <Undo2 className="h-4 w-4" />
                                        {t('ui.reservations.buttons.back')}
                                    </Button>
                            </Link>
                      </div>
                      <div></div>

                      <div className="w-full rounded-2xl p-4 shadow-md border">
                          <FiltersTable
                              filters={
                                  [
                                    // {
                                    //     id: 'email',
                                    //     label: t('ui.reservations.filters.email') || 'email',
                                    //     type: 'text',
                                    //     placeholder: t('ui.reservations.placeholders.email') || 'email...',
                                    // },
                                    // {
                                    //     id: 'isbn',
                                    //     label: t('ui.reservations.filters.isbn') || 'isbn',
                                    //     type: 'text',
                                    //     placeholder: t('ui.reservations.placeholders.isbn') || 'isbn...',
                                    // },
                                    // {
                                    //     id: 'title',
                                    //     label: t('ui.reservations.filters.title') || 'title',
                                    //     type: 'text',
                                    //     placeholder: t('ui.reservations.placeholders.title') || 'title...',
                                    // },
                                  ] as FilterConfig[]
                              }
                              onFilterChange={setFilters}
                              initialValues={filters}
                          />
                          <div className="text-right mt-2">
                              <span className="text-gray-500 text-sm">{t('ui.common.results')}</span>
                              <span className="font-bold text-blue-600 ml-1">{reservations?.meta.total}</span>
                          </div>
                      </div>

                      <div className="w-full overflow-hidden">
                          {isLoading ? (
                              <TableSkeleton columns={5} rows={10} />
                          ) : isError ? (
                              <div className="p-4 text-center">
                                  <div className="mb-4 text-red-500">{t('ui.reservations.error_loading')}</div>
                                  <Button onClick={() => refetch()} variant="outline">
                                      {t('ui.reservations.buttons.retry')}
                                  </Button>
                              </div>
                          ) : (
                              <div>
                                  <Table
                                      data={
                                          reservations ?? {
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
                                      noResultsMessage={t('ui.reservations.no_results') || 'No reservations found'}
                                  />
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </ReservationLayout>
  );
}
