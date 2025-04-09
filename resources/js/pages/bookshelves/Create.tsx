import { useTranslations } from "@/hooks/use-translations";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2} from "lucide-react";
import { BookshelfForm } from "./Components/BookshelfForm";
import { PageProps } from "@/types";

interface CreateBookshelfProps extends PageProps {
    floorsData?: {
        id:string;
        floorNumber:number;
        zonesCapacity: number;
        occupiedZones: number;
    }[];
    zonesData?:{
        id: string;
        zoneName: string;
        floor_id:string;
        bookshelvesCapacity:number;
        occupiedBookshelves:number;
    }[];


}

export default function createBookshelf({floorsData ,zonesData}:CreateBookshelfProps) {
  const { t } = useTranslations();


  return (
    <BookshelfLayout title={t("ui.bookshelves.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                        <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                            <div className="flex items-center gap-2">
                                <Icon iconNode={Building2} className="w-6 h-6 text-blue-500" />
                                <Label className="text-2xl font-black">{t("ui.bookshelves.create")}</Label>
                            </div>
                            <p className="text-gray-600">{t("ui.bookshelves.createBookshelf.subtitle")}</p>
                        </header>
                         <BookshelfForm
                          floorsData = {floorsData}
                          zonesData = {zonesData}
                         />
        </div>
        </div>
      </div>
    </BookshelfLayout>
  );
}
