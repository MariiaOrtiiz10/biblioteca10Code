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
import { BookLayout } from "@/layouts/books/BookLayout";
import { useBooks, Book, useDeleteBook } from "@/hooks/books/useBooks";


export default function SearchBookIndex() {
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
        filters.title ? filters.title:"null",
        filters.author ? filters.author:"null",
        filters.editorial ? filters.editorial:"null",
        filters.pages ? filters.pages:"null",
    ]

    const { data: books, isLoading, isError, refetch } = useBooks({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
      });
      const deleteBookMutation = useDeleteBook();

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
      };

      const handleDeleteBook = async (id: string) => {
        try {
          await deleteBookMutation.mutateAsync(id);
          refetch();
        } catch (error) {
          toast.error(t("ui.Book.deleted_error") || "Error deleting Book");
          console.error("Error deleting Book:", error);
        }
      };
      const columns = useMemo(() => ([

        createTextColumn<Book>({
            id: "isbn",
            header: t("ui.books.columns.isbn") || "isbn",
            accessorKey: "isbn",
          }),
          createTextColumn<Book>({
            id: "floorNumber",
            header: t("ui.books.columns.floorNumber") || "floorNumber",
            accessorKey: "floorNumber",
          }),
          createTextColumn<Book>({
            id: "zoneName",
            header: t("ui.books.columns.zoneName") || "zoneName",
            accessorKey: "zoneName",
          }),
          createTextColumn<Book>({
            id: "bookshelfNumber",
            header: t("ui.books.columns.bookshelfNumber") || "bookshelfNumber",
            accessorKey: "bookshelfNumber",
          }),

        ] as ColumnDef<Book>[]), [t, handleDeleteBook]);



  return (
     <BookLayout title={t('ui.searchBooks.title')}>
              <div className="p-6">
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h1 className="text-3xl font-bold">{t('ui.searchBooks.title')}</h1>
                      </div>
                      <div></div>

                      <div className="space-y-4">
                          <FiltersTable
                              filters={
                                  [
                                    {
                                        id: 'isbn',
                                        label: t('ui.books.filters.isbn') || 'isbn',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.isbn') || 'isbn...',
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
          </BookLayout>
  );
}
