import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { PageProps } from "@/types";

interface CreateUserProps extends PageProps {
  arrayPermissions?: String[];

}


export default function CreateUser({arrayPermissions}:CreateUserProps) {
  
  const { t } = useTranslations();
  

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <UserForm arrayPermissions={arrayPermissions} />
        </div>
      </div>
    </UserLayout>
  );
}
