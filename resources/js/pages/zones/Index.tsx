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
import { useZones , Zone, useDeleteZone } from "@/hooks/zones/useZones";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";


export default function ZoneIndex() {
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


    const combinedSearch = [
      filters.zoneName ? filters.zoneName:"null",
      filters.floorNumber ? filters.floorNumber : "null",
      filters.genre ? filters.genre : "null",
      filters.bookshelvesCapacity ? filters.bookshelvesCapacity : "null",
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

      const handleDeleteZone = async (id: string) => {
        try {
          await deleteZoneMutation.mutateAsync(id);
          refetch();
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
          }),
          createTextColumn<Zone>({
            id: "bookshelvesCapacity",
            header: t("ui.zones.columns.bookshelvesCapacity") || "bookshelvesCapacity",
            accessorKey: "bookshelvesCapacity",
          }),
          createTextColumn<Zone>({
            id: "occupiedBookshelves",
            header: t("ui.zones.columns.occupiedBookshelves") || "bookshelvesCapacity",
            accessorKey: "occupiedBookshelves",
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

                      <div className="space-y-4">
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
                                        type: 'text',
                                        placeholder: t('ui.zones.placeholders.genre') || 'genre...',
                                    },
                                    {
                                        id: 'bookshelvesCapacity',
                                        label: t('ui.zones.filters.bookshelvesCapacity') || 'bookshelvesCapacity',
                                        type: 'number',
                                        placeholder: t('ui.zones.placeholders.bookshelvesCapacity') || 'bookshelvesCapacity...',
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
