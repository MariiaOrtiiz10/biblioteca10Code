import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { EditForm } from "./components/EditForm";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
}

export default function EditUser({ user, page, perPage }: EditUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
          <EditForm
            initialData={user}
            page={page}
            perPage={perPage}
          />
        </div>
      </div>
    </UserLayout>
  );
}
