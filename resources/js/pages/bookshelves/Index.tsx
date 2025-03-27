import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";



export default function bookshelfIndex() {
  const { t } = useTranslations();

  return (
    <BookshelfLayout title={t('ui.bookshelves.title')}>
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.bookshelves.title')}</h1>
                      <Link href="/bookshelves/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.bookshelves.buttons.new')}
                          </Button>
                      </Link>
                  </div>
            </div>
        </div>
    </BookshelfLayout>
  );
}