import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Book, Search, Building2, Bookmark, SquareLibrary, ArrowUpDown, BookUp, ChartLine} from 'lucide-react';
import AppLogo from './app-logo';




const footerNavItems = (t: (key: string) => string): NavItem[] => [


];

export function AppSidebar() {
    const { t } = useTranslations();
    const { auth } = usePage().props;
     const mainNavItems = (t: (key: string) => string): NavItem[] => {
    const items: NavItem[] = [];
        items.push({
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    });

      auth.permissions.users.view &&
        items.push({
            title: t('ui.navigation.items.users'),
            url: '/users',
            icon: Users,
        });
    auth.permissions.floors.view &&
        items.push({
            title: t('ui.navigation.items.floors'),
            url: '/floors',
            icon: Building2,
        });
    auth.permissions.zones.view &&
        items.push({
            title: t('ui.navigation.items.zones'),
            url: '/zones',
            icon: Bookmark,
        });

    auth.permissions.bookshelves.view &&
        items.push({
            title: t('ui.navigation.items.bookshelves'),
            url: '/bookshelves',
            icon: SquareLibrary,
        });

    auth.permissions.books.view &&
         items.push({
            title: t('ui.navigation.items.books'),
            url: '/books',
            icon: Book,
        });

    auth.permissions.books.searchBooks &&
         items.push({
            title: t('ui.navigation.items.searchBooks'),
            url: '/searchBooks',
            icon: Search,
        });

    auth.permissions.loans.view &&
          items.push({
            title: t('ui.navigation.items.loans'),
            url: '/loans',
            icon: ArrowUpDown,
        });

    auth.permissions.loans.view &&
          items.push({
            title: t('ui.navigation.items.reservations'),
            url: '/reservations',
            icon: BookUp,
        });
        auth.permissions.statistics.view &&
          items.push({
            title: t('ui.navigation.items.graphics'),
            url: '/booksCharts',
            icon: ChartLine,
        });

    return items;
     };


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
