import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, router, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, Undo2, ChevronUp } from "lucide-react";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Table } from "@/components/stack-table/Table";
import { useLoans , Loan, useDeleteLoan } from "@/hooks/loans/useLoans";
import { LoanLayout } from "@/layouts/loans/LoanLayout";


export default function LoanIndex() {
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
        filters.isbn ? filters.isbn:"null",
        filters.email ? filters.email:"null",
        filters.loan_duration ? filters.loan_duration:"null",
        filters.start_date ? filters.start_date: "null",
        filters.end_date ? filters.end_date: "null",
    ]

    const { data: loans, isLoading, isError, refetch } = useLoans({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
      });

      const deleteLoanMutation = useDeleteLoan();
      //const returnLoanMutation = useReturnLoan();

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };



      const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
      };

      const handleDeleteLoan = async (id: string) => {
        try {
          await deleteLoanMutation.mutateAsync(id);
          refetch();
        } catch (error) {
          toast.error(t("ui.Loan.deleted_error") || "Error deleting Loan");
          console.error("Error deleting Loan:", error);
        }
      };

    //   const handleReturnLoan = async (id: string) => {
    //     try {
    //       await returnLoanMutation.mutateAsync(id);
    //       refetch();
    //       toast.success(t("ui.Loan.returned_success") || "Loan returned successfully");
    //     } catch (error) {
    //       toast.error(t("ui.Loan.returned_error") || "Error returning Loan");
    //       console.error("Error returning Loan:", error);
    //     }
    //   };


    // function handleChangeStatus (id: string){
    //     const newStatus = false;
    //     //const newReturned = new Date().toISOString().split('T')[0];
    //     const informacion = new FormData();
    //     informacion.append('newStatus', newStatus);
    //     informacion.append('_method', 'PUT');
    //     router.post(/loans/${id}, informacion);
    //     refetch();
    //   };



      const columns = useMemo(() => ([


          createTextColumn<Loan>({
            id: "email",
            header: t("ui.loans.columns.email") || "email",
            accessorKey: "email",
          }),
          createTextColumn<Loan>({
            id: "isbn",
            header: t("ui.loans.columns.isbn") || "isbn",
            accessorKey: "isbn",
          }),
        //   createTextColumn<Loan>({
        //     id: "title",
        //     header: t("ui.loans.columns.title") || "title",
        //     accessorKey: "title",
        //   }),
          createTextColumn<Loan>({
            id: "start_date",
            header: t("ui.loans.columns.start_date") || "start_date",
            accessorKey: "start_date",
          }),
          createTextColumn<Loan>({
            id: "end_date",
            header: t("ui.loans.columns.end_date") || "end_date",
            accessorKey: "end_date",
          }),
          createTextColumn<Loan>({
            id: "loan_duration",
            header: t("ui.loans.columns.loan_duration") || "loan_duration",
            accessorKey: "loan_duration",
          }),
          createTextColumn<Loan>({
            id: "status",
            header: t("ui.loans.columns.status") || "Status",
            accessorKey: "status",
            format: (value) => value ? t("ui.loans.active") : t("ui.loans.return"),
          }),
          createTextColumn<Loan>({
            id: "delayed_days",
            header: t("ui.loans.columns.delayed_days") || "delayed_date",
            accessorKey: "delayed_days",
          }),
          createTextColumn<Loan>({
            id: "returned_at",
            header: t("ui.loans.columns.returned_at") || "returned_at                                                                                                                                ",
            accessorKey: "returned_at",
          }),



          createActionsColumn<Loan>({
            id: "actions",
            header: t("ui.loans.columns.actions") || "Actions",
            renderActions: (loan) => (
              <>

                 {loan.status && (
                        <Button
                        variant="outline"
                        //onClick={() => handleReturnLoan(loan.id)}
                        size="icon"
                        title= {t("ui.loans.buttons.return") || "Return Book"} >
                        <Undo2 className="h-4 w-4 text-blue-700" />
                        </Button>

                    )}

                {loan.status && (
                <Link href={`/loans/${loan.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                  <Button variant="outline" size="icon" title={t("ui.loans.buttons.edit") || "Edit Book"}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </Link>
                )}

                <DeleteDialog
                  id={loan.id}
                  onDelete={handleDeleteLoan}
                  title={t("ui.loans.delete.title") || "Delete loan"}
                  description={t("ui.loans.delete.description") || "Are you sure you want to delete this loan? This action cannot be undone."}
                  trigger={
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.loans.buttons.delete") || "Delete Loan"}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  }
                />
              </>
            ),
          }),
        ] as ColumnDef<Loan>[]), [t, handleDeleteLoan]);



  return (
     <LoanLayout title={t('ui.loans.title')}>
              <div className="p-6">
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>
                          <Link href="/loans/create">
                              <Button>
                                  <PlusIcon className="mr-2 h-4 w-4" />
                                  {t('ui.loans.buttons.new')}
                              </Button>
                          </Link>
                      </div>
                      <div></div>

                      <div className="space-y-4">
                          <FiltersTable
                              filters={
                                  [
                                    {
                                        id: 'email',
                                        label: t('ui.loans.filters.email') || 'email',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.email') || 'email...',
                                    },
                                    {
                                        id: 'isbn',
                                        label: t('ui.loans.filters.isbn') || 'loan_duration',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.isbn') || 'isbn...',
                                    },
                                    {
                                        id: 'start_date',
                                        label: t('ui.loans.filters.start_date') || 'start_date',
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.start_date') || 'Select Date...',
                                        format: 'DD-MM-YYYY',
                                      },
                                      {
                                        id: 'end_date',
                                        label: t('ui.loans.filters.end_date') || 'end_date',
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.end_date') || 'Select Date...',
                                        format: 'DD-MM-YYYY',
                                      },

                                    {
                                        id: 'loan_duration',
                                        label: t('ui.loans.filters.loan_duration') || 'loan_duration',
                                        type: 'number',
                                        placeholder: t('ui.loans.placeholders.loan_duration') || 'loan_duration...',
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
                                  <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                                  <Button onClick={() => refetch()} variant="outline">
                                      {t('ui.loans.buttons.retry')}
                                  </Button>
                              </div>
                          ) : (
                              <div>
                                  <Table
                                      data={
                                          loans ?? {
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
                                      noResultsMessage={t('ui.loans.no_results') || 'No loans found'}
                                  />
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </LoanLayout>
  );
}
