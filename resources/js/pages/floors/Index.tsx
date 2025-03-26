import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { PageProps } from "@/types";
import { useState } from "react";

interface Floor {
  id: string;
  floorNumber: number;
  capacity: number;
}

interface FloorsPageProps extends PageProps {
  floors: Floor[];
}

export default function FloorIndex() {
  const { t } = useTranslations();
  const { props } = usePage<FloorsPageProps>();
  const { floors } = props;


  return (
    <FloorLayout title={t('ui.floors.title')}>
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.floors.title')}</h1>
                      <Link href="/floors/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.floors.buttons.new')}
                          </Button>
                      </Link>
                  </div>
            </div>
        </div>
    </FloorLayout>
  );
}