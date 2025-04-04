import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { ZoneForm } from "./Components/ZoneForm";


interface EditZoneProps extends PageProps {
  zone: {
    id: string;
    zoneName: string;
    floor_id:string;
    genre_id:string;
    bookshelvesCapacity:number;
  };
  floorsData?: {
    id:string;
    floorNumber:number;
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

  page?: string;
  perPage?: string;


}


export default function EditZone({ zone, page, perPage, floorsData, genresData, zoneNameByFloorsNumber}: EditZoneProps) {
  const { t } = useTranslations();

  return (
    <ZoneLayout title={t("ui.zones.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <ZoneForm
            initialData={zone}
            floorsData = {floorsData}
            genresData = {genresData}
            zoneNameByFloorsNumber = {zoneNameByFloorsNumber}
            page={page}
            perPage={perPage}
          />
        </div>
      </div>
    </ZoneLayout>
  );
}
