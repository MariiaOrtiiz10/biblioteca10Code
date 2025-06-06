import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { t } = useTranslations();
    const currentPath = window.location.pathname;

    const sidebarNavItems: NavItem[] = [
        {
            title: t('ui.settings.navigation.profile'),
            url: '/settings/profile',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.password'),
            url: '/settings/password',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.appearance'),
            url: '/settings/appearance',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.languages'),
            url: '/settings/languages',
            icon: undefined,
        },
    ];

    return (
        <div className="px-4 py-6">
            <Heading title={t('ui.settings.title')} description={t('ui.settings.description')} />
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
                    <section className="w-full space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
