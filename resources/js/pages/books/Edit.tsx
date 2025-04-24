import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2, Book} from "lucide-react";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { BookForm } from "./Components/BookForm";
import { BookLayout } from "@/layouts/books/BookLayout";

interface EditBookProps extends PageProps {
  book: {
    id: string;
    bookshelf_id: string;
    isbn: string;
    title: string;
    author: string;
    editorial: string;
    pages: number;
    genres: string;
  };
  genresData?: string[];

genres?: {
    id:string;
    genre:string;
}[];
zonesData?:{
    id:string;
    zoneName:string;
    floor_id:string;
    bookshelvesCapacity:number;
    occupiedBookshelves:number;
    genre_id:string;
    genre:string;
}[];

floorsData?:{
    id:string;
    floorNumber: number;
    zonesCapacity:number;
    occupiedZones:number;
}[];

bookshelvesData?:{
    id:string;
    zone_id:string;
    bookshelfNumber:number;
    booksCapacity:number;
    occupiedBooks:number;
}[];
  page?: string;
  perPage?: string;

}


export default function EditBookshelf({ book, page, perPage,genresData, genres, zonesData, floorsData, bookshelvesData}: EditBookProps) {
  const { t } = useTranslations();

  return (
    <BookLayout title={t("ui.books.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
         <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                                 <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                                     <div className="flex items-center gap-2">
                                         <Icon iconNode={Book} className="w-6 h-6 text-blue-500" />
                                         <Label className="text-2xl font-black">{t("ui.books.editBook.title")}</Label>
                                     </div>
                                     <p className="text-gray-600">{t("ui.books.editBook.subtitle")}</p>
                                 </header>
          <BookForm
            initialData={book}
            page={page}
            perPage={perPage}
            genresData = {genresData}
            genres = {genres}
            zonesData= {zonesData}
            floorsData={floorsData}
            bookshelvesData={bookshelvesData}
          />
        </div>
      </div>
      </div>
    </BookLayout>
  );
}
