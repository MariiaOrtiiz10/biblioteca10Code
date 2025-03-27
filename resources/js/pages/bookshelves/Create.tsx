import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./Components/BookshelfForm";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";



export default function CreateFloor() {
  const { t } = useTranslations();
  

  return (
    <BookshelfLayout title={t("ui.floors.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <h1>CREATE DE Bookshelves</h1>
        </div>
      </div>
    </BookshelfLayout>
  );
}