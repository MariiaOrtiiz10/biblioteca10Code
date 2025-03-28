import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { PageProps } from "@/types";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { useState, useMemo } from "react";
import { useFloors,Floor, useDeleteFloor } from "@/hooks/floors/useFloors";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Table } from "@/components/stack-table/Table";

// interface Floor {
//   id: string;
//   floorNumber: number;
//   capacity: number;
// }

// interface FloorsPageProps extends PageProps {
//   floors: Floor[];
// }

export default function FloorIndex() {
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
      filters.floorNumber ? `floorNumber:${filters.floorNumber}` : null,
      filters.floorName ? `floorName:${filters.floorName}` : null,
    ].filter(Boolean).join(' ');

    const { data: floors, isLoading, isError, refetch } = useFloors({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
      });
      const deleteFloorMutation = useDeleteFloor();

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
      };

      const handleDeleteFloor = async (id: string) => {
        try {
          await deleteFloorMutation.mutateAsync(id);
          refetch();
        } catch (error) {
          toast.error(t("ui.floors.deleted_error") || "Error deleting Floor");
          console.error("Error deleting Floor:", error);
        }
      };
      const columns = useMemo(() => ([
        //ID
        // createTextColumn<Floor>({
        //     id: "id",
        //     header: t("ui.floors.columns.id") || "floorId",
        //     accessorKey: "id",
        //   }),
          createTextColumn<Floor>({
            id: "floorNumber",
            header: t("ui.floors.columns.floorNumber") || "floorNumber",
            accessorKey: "floorNumber",
          }),
          createTextColumn<Floor>({
            id: "floorName",
            header: t("ui.floors.columns.floorName") || "floorName",
            accessorKey: "floorName",
          }),
          createTextColumn<Floor>({
            id: "zonesCapacity",
            header: t("ui.floors.columns.zonesCapacity") || "zonesCapacity",
            accessorKey: "zonesCapacity",
          }),
          createDateColumn<Floor>({
            id: "created_at",
            header: t("ui.floors.columns.created_at") || "Created At",
            accessorKey: "created_at",
          }),
          createActionsColumn<Floor>({
            id: "actions",
            header: t("ui.floors.columns.actions") || "Actions",
            renderActions: (floor) => (
              <>
                <Link href={`/floors/${floor.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                  <Button variant="outline" size="icon" title={t("ui.floors.buttons.edit") || "Edit floor"}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteDialog
                  id={floor.id}
                  onDelete={handleDeleteFloor}
                  title={t("ui.floors.delete.title") || "Delete floor"}
                  description={t("ui.floors.delete.description") || "Are you sure you want to delete this floor? This action cannot be undone."}
                  trigger={
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.floors.buttons.delete") || "Delete floor"}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  }
                />
              </>
            ),
          }),
        ] as ColumnDef<Floor>[]), [t, handleDeleteFloor]);



  return (
     <FloorLayout title={t('ui.floors.title')}>
              <div className="p-6">
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h1 className="text-3xl font-bold">{t('ui.floors.title')}</h1>
                          <Link href="/floors/create">
                              <Button>
                                  <PlusIcon className="mr-2 h-4 w-4" />
                                  {t('ui.floors.buttons.new')}
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
                                          label: t('ui.floors.filters.search') || 'Buscar',
                                          type: 'text',
                                          placeholder: t('ui.floors.placeholders.search') || 'Buscar...',
                                      },
                                      {
                                          id: 'floorNumber',
                                          label: t('ui.floors.filters.floorNumber') || 'floorNumber',
                                          type: 'text',
                                          placeholder: t('ui.floors.placeholders.floorNumber') || 'floorNumber...',
                                      },
                                      {
                                          id: 'floorName',
                                          label: t('ui.floors.filters.floorName') || 'floorName',
                                          type: 'text',
                                          placeholder: t('ui.floors.placeholders.floorName') || 'floorName...',
                                      },
                                    //   {
                                    //     id: 'zonesCapacity',
                                    //     label: t('ui.floors.filters.zonesCapacity') || 'zonesCapacity',
                                    //     type: 'text',
                                    //     placeholder: t('ui.floors.placeholders.zonesCapacity') || 'zonesCapacity...',
                                    // },
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
                                  <div className="mb-4 text-red-500">{t('ui.users.error_loading')}</div>
                                  <Button onClick={() => refetch()} variant="outline">
                                      {t('ui.users.buttons.retry')}
                                  </Button>
                              </div>
                          ) : (
                              <div>
                                  <Table
                                      data={
                                          floors ?? {
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
                                      noResultsMessage={t('ui.floors.no_results') || 'No floors found'}
                                  />
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </FloorLayout>
  );
}
