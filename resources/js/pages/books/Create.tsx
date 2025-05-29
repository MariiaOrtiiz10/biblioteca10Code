import { useTranslations } from "@/hooks/use-translations";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {Building2, Book} from "lucide-react";
import { PageProps } from "@/types";
import { BookLayout } from "@/layouts/books/BookLayout";
import { BookForm } from "./Components/BookForm";

interface CreateBookProps extends PageProps {
    genres: any[];
    zonesData:any[];
    floorsData:any[];
    bookshelvesData:any[];
    booksData?:any[];
}

export default function createBook({genres, zonesData, floorsData, bookshelvesData, booksData}:CreateBookProps) {
  const { t } = useTranslations();
  return (
    <BookLayout title={t("ui.books.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                        <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                            <div className="flex items-center gap-2">
                                <Icon iconNode={Book} className="w-6 h-6 text-blue-500" />
                                <Label className="text-2xl font-black">{t("ui.books.create")}</Label>
                            </div>
                            <p className="text-gray-600">{t("ui.books.createBook.subtitle")}</p>
                        </header>
                         <BookForm
                         genres = {genres}
                         zonesData= {zonesData}
                         floorsData={floorsData}
                         bookshelvesData={bookshelvesData}
                         booksData={booksData}
                         />
        </div>
        </div>
      </div>
    </BookLayout>
  );
}
