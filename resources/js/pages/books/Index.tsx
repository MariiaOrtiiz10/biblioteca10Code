
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { BookLayout } from "@/layouts/books/BookLayout";



export default function ZoneIndex() {
  const { t } = useTranslations();


  return (
    <BookLayout title={t('ui.books.title')}>
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                      <Link href="/books/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.books.buttons.new')}
                          </Button>
                      </Link>
                  </div>
            </div>
        </div>
    </BookLayout>
  );
}