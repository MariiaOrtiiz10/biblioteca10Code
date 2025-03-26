import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./Components/FloorForm";



export default function CreateFloor() {
  const { t } = useTranslations();
  

  return (
    <FloorLayout title={t("ui.floors.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <h1>HOLA</h1>
            {/* <FloorForm/> */}
        </div>
      </div>
    </FloorLayout>
  );
}