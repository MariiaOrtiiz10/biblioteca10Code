import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { ZoneForm } from "../books/Components/ZoneForm";


interface EditZoneProps extends PageProps {
  zone: {
    id: string;
    zoneName: string;
    bookshelvesCapacity:number;


  };
  page?: string;
  perPage?: string;
}

export default function EditZone({ zone, page, perPage}: EditZoneProps) {
  const { t } = useTranslations();

  return (
    <ZoneLayout title={t("ui.floors.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <ZoneForm
            initialData={zone}
            page={page}
            perPage={perPage}
          />
        </div>
      </div>
    </ZoneLayout>
  );
}
