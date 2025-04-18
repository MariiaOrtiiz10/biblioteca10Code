import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, Building2, Bookmark, SquareLibrary, Book, Search} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 ">
                <DashboardCard
                    title="Usuarios"
                    description="Gestiona los usuarios del sistema"
                    href="/users"
                    icon={Users}
                />

                 <DashboardCard
                    title="Pisos"
                    description="Gestiona los pisos del sistema"
                    href="/floors"
                    icon={Building2}
                />
                <DashboardCard
                    title="Zonas"
                    description="Gestiona las zonas del sistema"
                    href="/zones"
                    icon={Bookmark}
                />
                <DashboardCard
                    title="Estanterias"
                    description="Gestiona las estanterias del sistema"
                    href="/bookshelves"
                    icon={SquareLibrary}
                />
                <DashboardCard
                    title="Libros"
                    description="Gestiona los libros del sistema"
                    href="/books"
                    icon={Book}
                />
                <DashboardCard
                    title="Buscador de libros"
                    description="Localiza los libros del sistema"
                    href="/searchBooks"
                    icon={Search}
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
