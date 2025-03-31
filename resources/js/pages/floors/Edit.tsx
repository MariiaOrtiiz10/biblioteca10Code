
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { EditForm } from "../floors/Components/EditForm";


interface EditFloorProps extends PageProps {
  floor: {
    id: string;
    floorNumber: number;
    floorName: string;
    zonesCapacity: number;
  };
  page?: string;
  perPage?: string;
}

export default function EditFloor({ floor, page, perPage }: EditFloorProps) {
  const { t } = useTranslations();

  return (
    <FloorLayout title={t("ui.users.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <EditForm
            initialData={floor}
            page={page}
            perPage={perPage}
          />
        </div>
      </div>
    </FloorLayout>
  );
}
