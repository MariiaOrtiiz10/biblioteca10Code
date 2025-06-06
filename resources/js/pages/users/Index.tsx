import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { UserLayout } from "@/layouts/users/UserLayout";
import { User, useDeleteUser, useUsers } from "@/hooks/users/useUsers";
import { PencilIcon, PlusIcon, TrashIcon, Clock} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { PageProps } from "@/types";


interface IndexUserProps extends PageProps {

}

//Página principal que muestra una lista de usuarios.
export default function UsersIndex({userWithLoansansReservations}:IndexUserProps) {
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
        filters.name ? filters.name: "null",
        filters.email ? filters.email: "null",
        filters.created_at ? filters.created_at: "null",
  ];

  const { data: users, isLoading, isError, refetch } = useUsers({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteUserMutation = useDeleteUser();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      refetch();
    toast.success(t('ui.users.delete_dialog.success') || 'User deleted successfully');
    } catch (error) {
      toast.error(t("ui.users.deleted_error") || "Error deleting user");
      console.error("Error deleting user:", error);
    }
  };
      const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

  const handleViewTimeLine = async (id: string) => {
    router.get(`users/timeline`);
  }


  const columns = useMemo(() => ([
    createTextColumn<User>({
      id: "name",
      header: t("ui.users.columns.name") || "Name",
      accessorKey: "name",
    }),
    createTextColumn<User>({
      id: "email",
      header: t("ui.users.columns.email") || "Email",
      accessorKey: "email",
    }),
    createDateColumn<User>({
      id: "created_at",
      header: t("ui.users.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<User>({
      id: "actions",
      header: t("ui.users.columns.actions") || "Actions",
      renderActions: (user) => (
        <>
        {(auth.permissions.users.timeline) && (user.has_reservations || user.has_loans) && (
           <Link href={`/users/${user.id}`}>
                <Button
                variant="outline"
                size="icon"
                title={t("ui.users.buttons.timeLine") || "View TimeLine"}
                >
                <Clock className="h-4 w-4 text-blue-500" />
                </Button>
            </Link>
            )}

            {auth.permissions.users.edit && (
            <Link href={`/users/${user.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                <Button variant="outline" size="icon" title={t("ui.users.buttons.edit") || "Edit user"}>
                <PencilIcon className="h-4 w-4" />
                </Button>
            </Link>
        )}


         {auth.permissions.users.delete && (
            <DeleteDialog
                id={user.id}
                onDelete={handleDeleteUser}
                title={t("ui.users.delete.title") || "Delete user"}
                description={t("ui.users.delete.description") || "Are you sure you want to delete this user? This action cannot be undone."}
                trigger={
                <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title={t("ui.users.buttons.delete") || "Delete user"}
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
                }
            />
            )}


        </>

      ),
    }),
  ] as ColumnDef<User>[]), [t, handleDeleteUser]);

  return (
      <UserLayout title={t('ui.users.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.users.title')}</h1>
                      {auth.permissions.users.create && (
                      <Link href="/users/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.users.buttons.new')}
                          </Button>
                      </Link>
                      )}
                  </div>
                  <div></div>

                    <div className="w-full rounded-2xl p-4 shadow-md border">
                    <FiltersTable
                        filters={[
                            {
                                id: 'name',
                                label: t('ui.users.filters.name') || 'Nombre',
                                type: 'text',
                                placeholder: t('ui.users.placeholders.name') || 'Introduce un nombre...',
                            },
                            {
                                id: 'email',
                                label: t('ui.users.filters.email') || 'Email',
                                type: 'text',
                                placeholder: t('ui.users.placeholders.email') || 'Introduce un email...',
                            },
                            {
                                id: 'created_at',
                                label: t('ui.floors.filters.createdAt') || 'Fecha de creación',
                                type: 'date',
                                placeholder: t('ui.floors.placeholders.createdAt') || 'Selecciona una fecha...',
                                format: 'YYYY-MM-DD',
                            },
                        ] as FilterConfig[]}
                        onFilterChange={handleFilterChange}
                        initialValues={filters}
                    />
            <div className="text-right mt-2">
                <span className="text-gray-500 text-sm">{t('ui.common.results')}</span>
                <span className="font-bold text-blue-600 ml-1">{users?.meta.total}</span>
            </div>
    </div>

                  <div className="w-full overflow-hidden">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={10} />
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
                                      users ?? {
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
                                  noResultsMessage={t('ui.users.no_results') || 'No users found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </UserLayout>
  );
}
