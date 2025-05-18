import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./Components/FloorForm";
import { PageProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2} from "lucide-react";

interface CreateFloorProps extends PageProps {
    floorsData:any[];

}

export default function CreateFloor({floorsData}:CreateFloorProps) {
  const { t } = useTranslations();


  return (
    <FloorLayout title={t("ui.floors.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
        <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
            <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                <div className="flex items-center gap-2">
                    <Icon iconNode={Building2} className="w-6 h-6 text-blue-500" />
                    <Label className="text-2xl font-black">{t("ui.floors.create")}</Label>
                </div>
                <p className="text-gray-600">{t("ui.floors.createFloor.subtitle")}</p>
            </header>
            <FloorForm
            floorsData={floorsData}
             />
             </div>
        </div>
      </div>
    </FloorLayout >
  );
}
