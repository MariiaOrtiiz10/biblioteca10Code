import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { Head, usePage } from "@inertiajs/react";
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import {User, Book } from "lucide-react";
import { toast } from "sonner";

interface FlashMessages {
  success?: string;
  error?: string;
}

interface PageProps {
  flash: FlashMessages;
  [key: string]: unknown;
}

interface ChartLayout extends PropsWithChildren {
  title: string;
}
export default function ChartsLayout({ children,title }: ChartLayout) {
    const { t } = useTranslations();
    const currentPath = window.location.pathname;
    const { flash } = usePage<PageProps>().props;

    const sidebarNavItems: NavItem[] = [
        {
            title: t('ui.charts.navigation.books'),
            url: '/booksCharts',
            icon: Book,
        },
        {
            title: t('ui.charts.navigation.users'),
            url: '/usersCharts',
            icon: User,
        },
        {
            title: t('ui.charts.navigation.zones'),
            url: '/zonesCharts',
            icon: undefined,
        },

    ];
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
            title: t("ui.navigation.items.Charts"),
          href: "/booksCharts",
        },
      ];

      if (title !== t("ui.navigation.items.booksCharts")) {
        breadcrumbs.push({
          title,
          href: "#",
        });
      }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="px-4 py-6 ml-3">
            <div className="mb-5">
            <h1 className="text-3xl font-bold">{t('ui.charts.title')}</h1>
            <h3 className='text-gray-500 font-bold'>{t('ui.charts.description')}</h3>
            </div>
            {/* <Heading
            title={t('ui.charts.title')}
            description={t('ui.charts.description')}
            /> */}

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.url}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.url,
                                })}
                            >
                                <Link href={item.url} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 w-full px-4 md:px-6 xl:px-8 mx-auto">
                    <section className="w-full space-y-12 overflow-x-hidden">{children}</section>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}
