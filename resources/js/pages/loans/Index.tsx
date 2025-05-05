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
import axios from "../../lib/axios";


//import * as React from 'react';
//import {Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot,Typography } from "@/components/ui/timeline";


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
        filters.title ? filters.title:"null",
        filters.status? filters.status:"null",
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
          toast.success(t('ui.loans.delete_dialog.success') || 'Loan deleted successfully');
        } catch (error) {
          toast.error(t("ui.Loan.deleted_error") || "Error deleting Loan");
          console.error("Error deleting Loan:", error);
        }
      };




      function handleChangeStatus(id: string) {
        if (confirm(t('ui.loans.confirmReturn'))) {

            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            const formData = new FormData();
            formData.append('status', '0');
            formData.append('returned_at', formattedDate);
            formData.append('_method', 'PUT');

            router.post(`/loans/${id}`, formData, {
                onSuccess: () => {
                    refetch();
                },
                onError: (error) => {
                    console.error('Error al cambiar estado:', error);
                }
            });
        }
    }




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
          createTextColumn<Loan>({
            id: "title",
            header: t("ui.loans.columns.title") || "title",
            accessorKey: "title",
          }),

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
        //   createTextColumn<Loan>({
        //     id: "loan_duration",
        //     header: t("ui.loans.columns.loan_duration") || "loan_duration",
        //     accessorKey: "loan_duration",
        //   }),
          createTextColumn<Loan>({
            id: "status",
            header: t("ui.loans.columns.status") || "Status",
            accessorKey: "status",
            format: (value) => value ? t("ui.loans.active") : t("ui.loans.return"),
          }),

          createActionsColumn<Loan>({
            id: "delayed_days",
            header: t("ui.loans.columns.delayed_days") || "Delay Days",
            renderActions: (loan) => {
              if (loan.status) {
                return null; // Ocultar si el préstamo está activo
              }

              const delayedDays = loan.delayed_days ?? 0;
              const isDelayed = delayedDays > 0;
              const isOnTimeOrEarly = delayedDays <= 0;

              const className = isDelayed
                ? "font-bold text-red-600 dark:text-red-400 px-2 py-1 rounded"
                : "text-green-600 dark:text-green-400 px-2 py-1 rounded";

              return (
                <span className={className}>
                  {isOnTimeOrEarly ? t("ui.loans.returnEarly") || "Sin retraso" : delayedDays}
                </span>
              );
            }
          }),


        //   createTextColumn <Loan>({
        //     id: "delayed_days",
        //     header: t("ui.loans.columns.delayed_days") || "delayed_date",
        //     accessorKey: "delayed_days",
        //   }),

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
                        onClick={() => handleChangeStatus(loan.id)}
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
                      <div>

                      </div>


                      <div className="w-full rounded-2xl p-4 shadow-md border">
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
                                        id: 'title',
                                        label: t('ui.loans.filters.title') || 'title',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.title') || 'title...',
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
                                        id: 'status',
                                        label: t('ui.loans.filters.status')||  'status',
                                        type: 'select',
                                        options:[
                                            {value:'true', label: t('ui.loans.active') || 'Available'},
                                            {value:'false', label: t('ui.loans.return') || 'Available'},
                                        ],
                                        placeholder: t('ui.loans.placeholders.status')||  'available',
                                    },


                                    // {
                                    //     id: 'loan_duration',
                                    //     label: t('ui.loans.filters.loan_duration') || 'loan_duration',
                                    //     type: 'number',
                                    //     placeholder: t('ui.loans.placeholders.loan_duration') || 'loan_duration...',
                                    // },


                                  ] as FilterConfig[]
                              }
                              onFilterChange={setFilters}
                              initialValues={filters}
                          />
                          <div className="text-right mt-2">
                              <span className="text-gray-500 text-sm">{t('ui.common.results')}</span>
                              <span className="font-bold text-blue-600 ml-1">{loans?.meta.total}</span>
                          </div>
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
