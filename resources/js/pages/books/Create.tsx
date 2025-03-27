import { useTranslations } from "@/hooks/use-translations";
import { BookLayout } from "@/layouts/books/BookLayout";





export default function CreateZone() {
  const { t } = useTranslations();
  

  return (
    <BookLayout title={t("ui.books.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <h1>CREATE DE Books</h1>
            {/* <FloorForm/> */}
        </div>
      </div>
    </BookLayout>
  );
}