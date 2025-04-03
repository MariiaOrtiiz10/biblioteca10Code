import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { ZoneForm } from "../books/Components/ZoneForm";
import { PageProps } from "@/types";

interface CreateZoneProps extends PageProps {
    floorsData?: {
        id:string;
        floorNumber:number;
    }[];
    genresData?:{
        id:string;
        genre:string;
    }[];
    zoneNameByFloorsNumber?: {
        floorNumber:number;
        zoneName: string;
        floor_id: string;
    }[];

}


export default function CreateZone({floorsData, genresData, zoneNameByFloorsNumber}:CreateZoneProps) {
  const { t } = useTranslations();


  return (
    <ZoneLayout title={t("ui.zones.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <ZoneForm
            floorsData = {floorsData}
            genresData = {genresData}
            zoneNameByFloorsNumber={zoneNameByFloorsNumber}
            />
        </div>
      </div>
    </ZoneLayout>
  );
}
