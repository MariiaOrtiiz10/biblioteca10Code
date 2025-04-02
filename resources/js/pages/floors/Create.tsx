import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./Components/FloorForm";
import { PageProps } from "@/types";

interface CreateFloorProps extends PageProps {
    floorNumber?: number[];
    floorName?: string[];

}

export default function CreateFloor({floorNumber, floorName}:CreateFloorProps) {
  const { t } = useTranslations();


  return (
    <FloorLayout title={t("ui.floors.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <FloorForm  floorNumber={floorNumber} floorName={floorName} />

        </div>
      </div>
    </FloorLayout >
  );
}
