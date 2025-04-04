
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./Components/FloorForm";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2} from "lucide-react";

interface EditFloorProps extends PageProps {
  floor: {
    id: string;
    floorNumber: number;
    floorName: string;
    zonesCapacity: number;
  };
  floorsData:{
    id: string;
    floorNumber: number;
    zonesCapacity: number;
    occupiedZones: number;
  }[];
  page?: string;
  perPage?: string;
  floorNumber?: number[];
  floorName?: string[];

}

export default function EditFloor({ floor, page, perPage, floorNumber, floorName, floorsData}: EditFloorProps) {
  const { t } = useTranslations();
  console.log("floorsData:" ,floorsData);

  return (
    <FloorLayout title={t("ui.floors.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
        <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
            <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                <div className="flex items-center gap-2">
                    <Icon iconNode={Building2} className="w-6 h-6 text-blue-500" />
                    <Label className="text-2xl font-black">{t("ui.floors.edit")}</Label>
                </div>
                <p className="text-gray-600">{t("ui.floors.editFloor.subtitle")}</p>
            </header>
          <FloorForm
            initialData={floor}
            page={page}
            perPage={perPage}
            floorNumber={floorNumber}
            floorName={floorName}
            floorsData = {floorsData}
          />
        </div>
        </div>
      </div>
    </FloorLayout>
  );
}
