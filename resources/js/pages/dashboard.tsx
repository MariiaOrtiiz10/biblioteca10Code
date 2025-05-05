import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, Building2, Bookmark, SquareLibrary, Book, Search, ArrowUpDown, BookUp} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';
import { useTranslations } from '@/hooks/use-translations';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { t } = useTranslations();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title= {t('ui.navigation.items.dashboard')} />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 ">
                <DashboardCard
                    title= {t('ui.navigation.items.users')}
                    description="Gestiona los usuarios del sistema"
                    href="/users"
                    icon={Users}
                />

                 <DashboardCard
                    title= {t('ui.navigation.items.floors')}
                    description="Gestiona los pisos del sistema"
                    href="/floors"
                    icon={Building2}
                />
                <DashboardCard
                    title={t('ui.navigation.items.zones')}
                    description="Gestiona las zonas del sistema"
                    href="/zones"
                    icon={Bookmark}
                />
                <DashboardCard
                    title={t('ui.navigation.items.bookshelves')}
                    description="Gestiona las estanterias del sistema"
                    href="/bookshelves"
                    icon={SquareLibrary}
                />
                <DashboardCard
                    title={t('ui.navigation.items.books')}
                    description="Gestiona los libros del sistema"
                    href="/books"
                    icon={Book}
                />
                <DashboardCard
                    title={t('ui.navigation.items.searchBooks')}
                    description="Localiza los libros del sistema"
                    href="/searchBooks"
                    icon={Search}
                />
                <DashboardCard
                    title={t('ui.navigation.items.loans')}
                    description="Localiza los prestamos del sistema"
                    href="/loans"
                    icon={ArrowUpDown}
                />
                <DashboardCard
                    title={t('ui.navigation.items.reservations')}
                    description="Localiza las Reservas del sistema"
                    href="/reservations"
                    icon={BookUp}
                />

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
