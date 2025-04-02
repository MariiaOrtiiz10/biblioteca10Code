import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { ZoneForm } from "../books/Components/ZoneForm";
import { PageProps } from "@/types";

interface CreateZoneProps extends PageProps {
    floorsData?: {
        id:string;
        floorNumber:number;
    };

}


export default function CreateZone({floorsData}:CreateZoneProps) {
  const { t } = useTranslations();


  return (
    <ZoneLayout title={t("ui.zones.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <ZoneForm floorsData = {floorsData} />
        </div>
      </div>
    </ZoneLayout>
  );
}
