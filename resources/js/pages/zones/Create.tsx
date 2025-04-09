import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { ZoneForm } from "./Components/ZoneForm";
import { PageProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2} from "lucide-react";

interface CreateZoneProps extends PageProps {
    floorsData?: {
        id:string;
        floorNumber:number;
        floorName:string;
        zonesCapacity: number;
        occupiedZones: number;
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
    zonesData?:{
        id: string;
        zoneName: string;
        floor_id:string;
        occupiedBookshelves: number;
    }[];


}


export default function CreateZone({floorsData, genresData ,zonesData}:CreateZoneProps) {
  const { t } = useTranslations();


  return (
    <ZoneLayout title={t("ui.zones.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                        <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                            <div className="flex items-center gap-2">
                                <Icon iconNode={Building2} className="w-6 h-6 text-blue-500" />
                                <Label className="text-2xl font-black">{t("ui.zones.createZone.title")}</Label>
                            </div>
                            <p className="text-gray-600">{t("ui.zones.createZone.subtitle")}</p>
                        </header>
            <ZoneForm
            floorsData = {floorsData}
            genresData = {genresData}
            zonesData = {zonesData}
            />
        </div>
      </div>
      </div>
    </ZoneLayout>
  );
}
