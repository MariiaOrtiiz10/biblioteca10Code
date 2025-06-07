import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, Building2, Bookmark, SquareLibrary, Book, Search, ArrowUpDown, BookUp, ChartLine} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';
import { useTranslations } from '@/hooks/use-translations';
import { Link, usePage, router } from "@inertiajs/react";



export default function Dashboard() {
    const { t } = useTranslations();
    const { auth } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t("ui.navigation.items.dashboard"),
            href: '/dashboard',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title= {t('ui.navigation.items.dashboard')} />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 ">
                 {auth.permissions.users.view && (
                <DashboardCard
                    title= {t('ui.navigation.items.users')}
                    description={t('ui.navigation.items.description.users')}
                    href="/users"
                    icon={Users}
                />
                  )}
                     {auth.permissions.floors.view && (
                 <DashboardCard
                    title= {t('ui.navigation.items.floors')}
                    description={t('ui.navigation.items.description.floors')}
                    href="/floors"
                    icon={Building2}
                />
                )}
                    {auth.permissions.zones.view && (
                <DashboardCard
                    title={t('ui.navigation.items.zones')}
                    description={t('ui.navigation.items.description.zones')}
                    href="/zones"
                    icon={Bookmark}
                />
                    )}

                    {auth.permissions.bookshelves.view && (
                <DashboardCard
                    title={t('ui.navigation.items.bookshelves')}
                    description={t('ui.navigation.items.description.bookshelves')}
                    href="/bookshelves"
                    icon={SquareLibrary}
                />
                )}

                    {auth.permissions.books.view && (
                <DashboardCard
                    title={t('ui.navigation.items.books')}
                    description={t('ui.navigation.items.description.books')}
                    href="/books"
                    icon={Book}
                />
                )}

                    {auth.permissions.books.searchBooks && (
                <DashboardCard
                    title={t('ui.navigation.items.searchBooks')}
                    description={t('ui.navigation.items.description.searchBooks')}
                    href="/searchBooks"
                    icon={Search}
                />
                 )}

                    {auth.permissions.loans.view && (
                <DashboardCard
                    title={t('ui.navigation.items.loans')}
                    description={t('ui.navigation.items.description.loans')}
                    href="/loans"
                    icon={ArrowUpDown}
                />
                 )}

                    {auth.permissions.reservations.view && (
                <DashboardCard
                    title={t('ui.navigation.items.reservations')}
                    description={t('ui.navigation.items.description.reservations')}
                    href="/reservations"
                    icon={BookUp}
                />
                )}

                {auth.permissions.statistics.view && (
                <DashboardCard
                    title={t('ui.navigation.items.charts')}
                    description={t('ui.navigation.items.description.charts')}
                    href="/booksCharts"
                    icon={ChartLine}
                />
                )}

                    {/* <CardFlip
                    contentFront={
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={Book} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Libros</h3>
                                <p className="text-sm text-muted-foreground">descripcion de usuario</p>
                            </div>
                        </div>
                    }
                    contentBack={
                        <div className="flex w-full h-full items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={Search} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Buscador de libros</h3>
                                <p className="text-sm text-muted-foreground">descripcion de cliente</p>

                            </div>
                        </div>
                    }
                /> */}

                {/* <CardFlip
                    contentFront={
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Usuario 1</h3>
                                <p className="text-sm text-muted-foreground">descripcion de usuario</p>
                            </div>
                        </div>
                    }
                    contentBack={
                        <div className="flex w-full h-full items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">cliente 2</h3>
                                <p className="text-sm text-muted-foreground">descripcion de cliente</p>

                            </div>
                        </div>
                    }
                /> */}

            </div>
        </AppLayout>
    );
}
