
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./Components/FloorForm";


interface EditFloorProps extends PageProps {
  floor: {
    id: string;
    floorNumber: number;
    floorName: string;
    zonesCapacity: number;
  };
  page?: string;
  perPage?: string;
  floorNumber?: number[];
  floorName?: string[];
}

export default function EditFloor({ floor, page, perPage, floorNumber, floorName}: EditFloorProps) {
  const { t } = useTranslations();

  return (
    <FloorLayout title={t("ui.floors.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <FloorForm
            initialData={floor}
            page={page}
            perPage={perPage}
            floorNumber={floorNumber}
            floorName={floorName}
          />
        </div>
      </div>
    </FloorLayout>
  );
}
