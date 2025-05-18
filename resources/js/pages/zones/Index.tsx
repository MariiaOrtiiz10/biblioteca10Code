import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { PageProps } from "@/types";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Table } from "@/components/stack-table/Table";
import { useZones , Zone, useDeleteZone } from "@/hooks/zones/useZones";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";

interface IndexZoneProps extends PageProps {
    genres:{
        id:string;
        genre:string;
    }[];

}
export default function ZoneIndex({genres}:IndexZoneProps) {
  const { t } = useTranslations();
  const { url } = usePage();
  console.log(genres)

    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});


    const combinedSearch = [
      filters.zoneName ? filters.zoneName:"null",
      filters.floorNumber ? filters.floorNumber : "null",
      filters.genre ? filters.genre : "null",
      filters.bookshelvesCapacity ? filters.bookshelvesCapacity : "null",
      filters.created_at ? filters.created_at : "null",
    ]

    const { data: zones, isLoading, isError, refetch } = useZones({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
      });
      const deleteZoneMutation = useDeleteZone();

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
      };

            const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };


      const handleDeleteZone = async (id: string) => {
        try {
          await deleteZoneMutation.mutateAsync(id);
          refetch();
          toast.success(t('ui.zones.delete_dialog.success') || 'Zone deleted successfully');
        } catch (error) {
          toast.error(t("ui.zones.deleted_error") || "Error deleting Zone");
          console.error("Error deleting Zone:", error);
        }
      };
      const columns = useMemo(() => ([
        //ID
        createTextColumn<Zone>({
            id: "zoneName",
            header: t("ui.zones.columns.zoneName") || "zoneName",
            accessorKey: "zoneName",
          }),
          createTextColumn<Zone>({
            id: "floorNumber",
            header: t("ui.zones.columns.floorNumber") || "floorNumber",
            accessorKey: "floorNumber",
          }),
          createTextColumn<Zone>({
            id: "genre",
            header: t("ui.zones.columns.genre") || "genre",
            accessorKey: "genre",
            format: (value) => t(`ui.genres.${value}`) || value
          }),
            createActionsColumn<Zone>({
                      id: "avaibleBookshelves",
                      header: t("ui.zones.columns.avaibleBookshelves") || "Available / Total",
                      renderActions: (zone) => {
                          const isFull = zone.bookshelvesCapacity === zone.occupiedBookshelves;

                          const className = isFull
                          ? "font-bold text-red-600 dark:text-red-400 px-2 py-1 rounded"
                          : "font-bold text-green-600 dark:text-green-400 px-2 py-1 rounded";

                          return (
                          <span className={className}>
                              {zone.occupiedBookshelves} / {zone.bookshelvesCapacity}
                          </span>
                          );
                      }
                      }),

          createDateColumn<Zone>({
            id: "created_at",
            header: t("ui.zones.columns.created_at") || "Created At",
            accessorKey: "created_at",
          }),
          createActionsColumn<Zone>({
            id: "actions",
            header: t("ui.zones.columns.actions") || "Actions",
            renderActions: (zone) => (
              <>
                <Link href={`/zones/${zone.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                  <Button variant="outline" size="icon" title={t("ui.zones.buttons.edit") || "Edit Zone"}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteDialog
                  id={zone.id}
                  onDelete={handleDeleteZone}
                  title={t("ui.zones.delete.title") || "Delete floor"}
                  description={t("ui.zones.delete.description") || "Are you sure you want to delete this zone? This action cannot be undone."}
                  trigger={
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.zones.buttons.delete") || "Delete floor"}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  }
                />
              </>
            ),
          }),
        ] as ColumnDef<Zone>[]), [t, handleDeleteZone]);



  return (
     <ZoneLayout title={t('ui.zones.title')}>
              <div className="p-6">
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h1 className="text-3xl font-bold">{t('ui.zones.title')}</h1>
                          <Link href="/zones/create">
                              <Button>
                                  <PlusIcon className="mr-2 h-4 w-4" />
                                  {t('ui.zones.buttons.new')}
                              </Button>
                          </Link>
                      </div>
                      <div></div>


                      <div className="w-full rounded-2xl p-4 shadow-md border">
                          <FiltersTable
                              filters={
                                  [
                                      {
                                          id: 'zoneName',
                                          label: t('ui.zones.filters.zoneName') || 'zoneName',
                                          type: 'text',
                                          placeholder: t('ui.zones.placeholders.zoneName') || 'zoneName...',
                                      },
                                      {
                                          id: 'floorNumber',
                                          label: t('ui.zones.filters.floorNumber') || 'floorNumber',
                                          type: 'number',
                                          placeholder: t('ui.zones.placeholders.floorNumber') || 'floorNumber...',
                                      },
                                      {
                                        id: 'genre',
                                        label: t('ui.zones.filters.genre') || 'genre',
                                        type: 'select',
                                        options:genres.map(genre => ({
                                            label:  t(`ui.genres.${genre.genre}`),
                                            value: genre.genre,
                                        })),
                                        placeholder: t('ui.zones.placeholders.genre') || 'genre...',
                                    },
                                    {
                                        id: 'bookshelvesCapacity',
                                        label: t('ui.zones.filters.bookshelvesCapacity') || 'bookshelvesCapacity',
                                        type: 'number',
                                        placeholder: t('ui.zones.placeholders.bookshelvesCapacity') || 'bookshelvesCapacity...',
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.zones.filters.createdAt') || 'Select Date...',
                                        type: 'date',
                                        placeholder: t('ui.zones.placeholders.createdAt') || 'created_at...',
                                        format: 'YYYY-MM-DD',
                                    },



                                  ] as FilterConfig[]
                              }
                              onFilterChange={handleFilterChange}
                              initialValues={filters}
                          />
                           <div className="text-right mt-2">
                                <span className="text-gray-500 text-sm">{t('ui.common.results')}</span>
                                <span className="font-bold text-blue-600 ml-1">{zones?.meta.total}</span>
                            </div>
                      </div>
                      {/* <div>
                        {zones?.meta.total}
                      </div> */}

                      <div className="w-full overflow-hidden">
                          {isLoading ? (
                              <TableSkeleton columns={5} rows={10} />
                          ) : isError ? (
                              <div className="p-4 text-center">
                                  <div className="mb-4 text-red-500">{t('ui.zones.error_loading')}</div>
                                  <Button onClick={() => refetch()} variant="outline">
                                      {t('ui.zones.buttons.retry')}
                                  </Button>
                              </div>
                          ) : (
                              <div>
                                  <Table
                                      data={
                                          zones ?? {
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
                                      noResultsMessage={t('ui.zones.no_results') || 'No zones found'}
                                  />
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </ZoneLayout>
  );
}
