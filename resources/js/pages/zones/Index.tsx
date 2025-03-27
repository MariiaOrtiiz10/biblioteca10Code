
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";



export default function ZoneIndex() {
  const { t } = useTranslations();


  return (
    <ZoneLayout title={t('ui.zones.title')}>
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.zones.title')}</h1>
                      <Link href="/zones/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.zones.buttons.new')}
                          </Button>
                      </Link>
                  </div>
            </div>
        </div>
    </ZoneLayout>
  );
}