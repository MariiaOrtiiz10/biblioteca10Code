import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from "@/types";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, Typography, Chip, Stack, Box, Divider, useMediaQuery } from '@mui/material';
import {ArrowUpDown,  BookOpen, Calendar, Clock, CheckCircle, XCircle, Tag , Hourglass, User, Undo2, BookUp} from "lucide-react";
import ChartsLayout from '@/layouts/charts/chartsLayout';
import { AreaChart } from 'recharts';


interface EditZoneProps extends PageProps {

}

export default function Zones({}:EditZoneProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.charts.zones.title'),
            href: '/charts/zones',
        },
    ];
    return (
        <ChartsLayout title={t('ui.charts.zone.title')}>
            <Head title={t('ui.charts.zone.title')}/>
            <div className="w-full px-2 mx-auto">
                <div className="mb-2">
                    <HeadingSmall
                        title={t('ui.charts.zone.title')}
                        description={t('')}
                        />
                </div>
                <div className='flex'>
                    <div className=''>
                        <AreaChart width={500} height={400}>

                        </AreaChart>

                    </div>

                </div>

            </div>
        </ChartsLayout>

    );
}

