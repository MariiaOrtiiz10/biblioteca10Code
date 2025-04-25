import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, router, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, BookUp, ArrowUpDown } from "lucide-react";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ColumnDef, createColumn, Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Table } from "@/components/stack-table/Table";
import { BookLayout } from "@/layouts/books/BookLayout";
import { useBooks, Book, useDeleteBook } from "@/hooks/books/useBooks";
import { PageProps } from "@/types";

interface IndexBookProps extends PageProps {
    floors:{
        id:string;
        floorNumber:number;
    }[];
    zones:{
        id:string;
        zoneName:string;
    }[];
    bookshelves:{
        id:string;
        bookshelfNumber:number;
    }[];
}

export default function SearchBookIndex({floors, zones, bookshelves}:IndexBookProps) {
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
        filters.genres ? filters.genres:"null",
        filters.available ? filters.available:"null",
        filters.floorNumber ? filters.floorNumber:'null',
        filters.zoneName ? filters.zoneName:'null',
        filters.bookshelfNumber ? filters.bookshelfNumber:'null',
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
      function handleCreateLoan(isbn: string){
        router.get(`loans/create`, {isbn})
      }

      function handleCreateReservation(isbn: string){
        router.get(`reservations/create`, {isbn})
      }




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
          createTextColumn<Book>({
            id: "available",
            header: t("ui.books.columns.available") || "available",
            accessorKey: "available",
            format: (value) => value ? t("ui.books.available") : t("ui.books.notAvailable"),
          }),
          createTextColumn<Book>({
            id: "availableBookIsbn",
            header: t("ui.books.columns.availableBookIsbn") || "Available / Total",
            accessorKey: "availableBookIsbn",


          }),




           createActionsColumn<Book>({
                      id: "actions",
                      header: t("ui.books.columns.actions") || "Actions",
                      renderActions: (book) => (
                          <>
                              {book.available && (
                                <Button
                                variant="outline"
                                size="icon"
                                title= {t("ui.books.buttons.loan") || "Loan Book"}
                                onClick={()=>handleCreateLoan(book.isbn)}
                                >
                                <ArrowUpDown className="h-4 w-4 text-orange-500" />

                                </Button>
                            )}
                            {!book.available && (
                                <Button
                                variant="outline"
                                size="icon"
                                title= {t("ui.books.buttons.reserve") || "Reserve Book"}
                                onClick={()=>handleCreateReservation(book.isbn)}

                                >
                                <BookUp className="h-5 w-5 text-blue-500" />
                                </Button>
                            )}

                          </>
                        )
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

                      <div className="w-full rounded-2xl p-4 shadow-md border">
                          <FiltersTable
                              filters={
                                  [
                                    {
                                        id: 'isbn',
                                        label: t('ui.books.filters.isbn') || 'isbn',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.isbn') || 'isbn...',
                                    },
                                    {
                                        id: 'available',
                                        label: t('ui.books.filters.available')||  'available',
                                        type: 'select',
                                        options:[
                                            {value:'true', label: t('ui.books.available') || 'Available'},
                                            {value:'false', label: t('ui.books.notAvailable') || 'Available'},
                                        ],
                                        placeholder: t('ui.books.placeholders.available')||  'available',
                                    },
                                    {
                                        id: 'floorNumber',
                                        label: t('ui.books.filters.floors') || 'floors',
                                        type: 'select',
                                        options: floors.map(floor => ({
                                        label: floor.floorNumber,
                                        value: floor.floorNumber,
                                        })),
                                        placeholder: t('ui.books.placeholders.floors') || 'floors...',
                                    },
                                    {
                                        id: 'zoneName',
                                        label: t('ui.books.filters.zones') || 'zones',
                                        type: 'select',
                                        options: Array.from(
                                            new Map(zones.map(zone => [zone.zoneName, { label: zone.zoneName, value: zone.zoneName }]))
                                            .values()
                                          ),
                                        placeholder: t('ui.books.placeholders.zones') || 'zones...',
                                    },
                                    {
                                        id: 'bookshelfNumber',
                                        label: t('ui.books.filters.bookshelves') || 'zones',
                                        type: 'select',
                                        options: bookshelves.map(bookshelf => ({
                                        label: bookshelf.bookshelfNumber,
                                        value: bookshelf.bookshelfNumber,
                                        })),
                                        placeholder: t('ui.books.placeholders.zones') || 'zones...',
                                    },

                                  ] as FilterConfig[]
                              }
                              onFilterChange={setFilters}
                              initialValues={filters}
                          />
                          <div className="text-right mt-2">
                              <span className="text-gray-500 text-sm">{t('ui.common.results')}</span>
                              <span className="font-bold text-blue-600 ml-1">{books?.meta.total}</span>
                          </div>
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
