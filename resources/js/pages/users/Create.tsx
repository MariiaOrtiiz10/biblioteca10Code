import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { PageProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { User } from "lucide-react";

interface CreateUserProps extends PageProps {
  roles?: any[];
  permissions?: any[];
  usersData : any[];
}


export default function CreateUser({roles, permissions, usersData}:CreateUserProps) {

  const { t } = useTranslations();


  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                    <div className="flex items-center gap-2">
                        <Icon iconNode={User} className="w-6 h-6 text-blue-500" />
                        <Label className="text-2xl font-black">{t("ui.users.create")}</Label>
                    </div>
                    <p className="text-gray-600">{t("ui.createUser.Header.h2")}</p>
                </header>
                <UserForm
                 roles={roles}
                 permissions = {permissions}
                 usersData = {usersData}
                 />
            </div>
        </div>
      </div>
    </UserLayout>
  );
}

