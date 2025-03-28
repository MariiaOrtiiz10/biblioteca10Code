import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";




export default function CreateZone() {
  const { t } = useTranslations();
  

  return (
    <ZoneLayout title={t("ui.zones.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <h1>CREATE DE Zones</h1>
            {/* <FloorForm/> */}
        </div>
      </div>
    </ZoneLayout>
  );
}