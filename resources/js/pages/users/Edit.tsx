import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { UserForm } from "./components/UserForm";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { User } from "lucide-react";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
  permissionNames?: any[];
  roles?: any[];
  permissions?: any[];



}

export default function EditUser({ user, page, perPage, permissionNames,roles, permissions} : EditUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.edit")}>
        <div className="flex justify-center items-start py-1 px-6">
                <div className="w-full max-w-3xl">
                    <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                        <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                            <div className="flex items-center gap-2">
                                <Icon iconNode={User} className="w-6 h-6 text-blue-500" />
                                <Label className="text-2xl font-black">{t("ui.users.edit")}</Label>
                            </div>
                            <p className="text-gray-600">{t("ui.editUser.Header.h2")}</p>
                        </header>

          <UserForm
            initialData={user}
            page={page}
            perPage={perPage}
            permissionNames = {permissionNames}
            roles={roles}
            permissions = {permissions}
          />
        </div>
        </div>
      </div>
    </UserLayout>
  );
}
