import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";

interface FlashMessages {
  success?: string;
  error?: string;
}

interface PageProps {
  flash: FlashMessages;
  [key: string]: unknown;
}

interface LoanLayout extends PropsWithChildren {
  title: string;
}

export function LoanLayout({ title, children }: LoanLayout) {
  const { flash } = usePage<PageProps>().props;
  const { t } = useTranslations();

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t("ui.navigation.items.dashboard"),
      href: "/dashboard",
    },
    {
      title: t("ui.navigation.items.loans"),
      href: "/loans",
    },
  ];

  if (title !== t("ui.navigation.items.loans")) {
    breadcrumbs.push({
      title,
      href: "#",
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={title} />
      {children}
    </AppLayout>
  );
}
