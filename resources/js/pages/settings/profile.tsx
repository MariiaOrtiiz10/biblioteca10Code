import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { PageProps } from "@/types";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, Typography, Chip, Stack, Box, Divider, useMediaQuery } from '@mui/material';
import {ArrowUpDown,  BookOpen, Calendar, Clock, CheckCircle, XCircle, Tag , Hourglass, User, Undo2, BookUp} from "lucide-react";
// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

type FilterType = 'all' | 'reservation' | 'loan';

interface EditProfileProps extends PageProps {
    loans:any[];
    reservations:any[];
}

export default function Profile({loans, reservations}:EditProfileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [filter, setFilter] = useState('all');
    const filteredItems = [...reservations.map(r => ({
        ...r,
        type: 'reservation' as const,
        sortDate: new Date(r.created_at)
    })), ...loans.map(l => ({
        ...l,
        type: 'loan' as const,
        sortDate: new Date(l.start_date)
    }))]
    .filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    })
    .sort((a, b) => b.sortDate - a.sortDate);

    console.log(reservations);
    const COLOR_PENDING = '#FFD54F';
    const COLOR_ON_TIME = '#81C784';
    const COLOR_LATE = '#FF8A65';




    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />
            <SettingsLayout>
            <div className="w-full max-w-5xl px-4 xl:max-w-none xl:w-[175%] xl:px-0 mx-auto">
                <div className="mb-4">
                    <HeadingSmall
                        title={t('ui.settings.profile.title')}
                        description={t('')}
                    />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center my-4">
                        <Button variant={filter === 'all' ? "default" : "outline"} onClick={() => setFilter("all")}>{t('ui.timeline.filter.all')}</Button>
                        <Button variant={filter === 'reservation' ? "default" : "outline"} onClick={() => setFilter("reservation")}>{t('ui.timeline.filter.reservation')}</Button>
                        <Button variant={filter === 'loan' ? "default" : "outline"} onClick={() => setFilter("loan")}>{t('ui.timeline.filter.loans')}</Button>
                    </div>


                    <div>
                    <VerticalTimeline lineColor='#888888'>
                    {filteredItems.map((item, index) => {
                                if (item.type === 'reservation') {
                                    const { book } = item;
                                    const dateOnly = item.created_at.split('T')[0];
                                    const timeOnly = item.created_at.split('T')[1].substring(0, 8);
                                    return (
                                        <VerticalTimelineElement
                                            key={`res-${index}`}
                                            contentStyle={{
                                                background: '#f0f4ff',
                                                color: '#1e3a8a',
                                                borderRadius: '12px',
                                            }}
                                            contentArrowStyle={{
                                                borderRight: '8px solid #f0f4ff',
                                            }}
                                            icon={<BookUp />}
                                            iconStyle={{
                                                background: '#3b82f6',
                                                color: '#fff',
                                            }}
                                            date={
                                                <span className='text-blue-700 m-2 font-bold hidden lg:inline'>
                                                    {dateOnly}
                                                </span>
                                            }
                                        >
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BookOpen size={24} style={{ color: "#1e3a8a", flexShrink: 0 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e3a8a" }}>{book.title}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: "#374151", }}>
                                                    <User size={20} />
                                                    <strong>{t("ui.timeline.author")}:</strong> {book.author}
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: "#374151" }}>
                                                    <Calendar size={20} />
                                                    <strong>{t("ui.timeline.start_reservation")}:</strong> {dateOnly} {timeOnly}
                                                </Box>
                                            </Box>
                                        </VerticalTimelineElement>
                                    );
                                } else {
                                    const { book } = item;
                                    const isReturned = item.status === false;
                                    const isLate = item.delayed_days > 0;
                                    const delayText = isLate
                                        ? `${item.delayed_days} ${t("ui.timeline.delay")}`
                                        : t("ui.timeline.no_delay");
                                    let cardColor = COLOR_PENDING;
                                    if (isReturned) {
                                        cardColor = isLate ? COLOR_LATE : COLOR_ON_TIME;
                                    } else if (isLate) {
                                        cardColor = COLOR_LATE;
                                    }
                                    return (
                                        <VerticalTimelineElement
                                            key={`loan-${index}`}
                                            contentStyle={{
                                                background: cardColor,
                                                color: '#000',
                                                borderRadius: '12px',
                                            }}
                                            contentArrowStyle={{
                                                borderRight: `8px solid ${cardColor}`,
                                            }}
                                            icon={<ArrowUpDown />}
                                            iconStyle={{
                                                background: 'rgb(249,115,22)',
                                                color: '#fff',
                                            }}
                                            date={
                                                <span className='text-orange-500 m-2 font-bold hidden lg:inline'>
                                                    {item.start_date}
                                                </span>
                                            }
                                        >
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BookOpen size={24} style={{ color: "blue", flexShrink: 0 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{book.title}</Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <User size={20} />
                                                    <strong>{t("ui.timeline.author")}</strong>: {book.author}
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Calendar size={20} />
                                                    <strong>{t("ui.timeline.start_date")}</strong>: {item.start_date}
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Clock size={20} />
                                                    <strong>{t("ui.timeline.end_date")}</strong>: {item.end_date}
                                                </Box>

                                                {isReturned && item.returned_at && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Undo2 size={20} />
                                                        <strong>{t("ui.timeline.returned")}</strong>: {item.returned_at}
                                                    </Box>
                                                )}

                                                <Divider sx={{ my: 1 }} />

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {isReturned ? (
                                                        <CheckCircle size={20} color="#3B82F6" />
                                                    ) : (
                                                        <Hourglass size={20} color="#ff7514" />
                                                    )}
                                                    <strong>{t("ui.timeline.status")}</strong>: {isReturned ? `${t("ui.timeline.returned2")}` : t("ui.timeline.ongoing")}
                                                </Box>

                                                {isReturned && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Clock size={20} color={isLate ? "red" : "green"} />
                                                        {delayText}
                                                    </Box>
                                                )}
                                            </Box>
                                        </VerticalTimelineElement>
                                    );
                                }
                            })}

                    </VerticalTimeline>


                    </div>
                </div>


            </SettingsLayout>
        </AppLayout>
    );
}
