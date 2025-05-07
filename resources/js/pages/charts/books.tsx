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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';


interface EditBookProps extends PageProps {
    bookswithLoansReservations: any[];
}

export default function Books({bookswithLoansReservations}:EditBookProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    console.log(bookswithLoansReservations);




    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.charts.book.title'),
            href: '/charts/books',
        },
    ];
    return (
        <ChartsLayout title={t('ui.charts.book.title')}>
            <Head title={t('ui.charts.book.title')}/>
            <div className="w-full px-2 mx-auto">
                <div className="mb-2">
                    <HeadingSmall
                        title={t('ui.charts.book.title')}
                        description={t('')}
                        />
                </div>
                <div className=''>
                    <div className="w-full overflow-x-auto mt-8">
                        <div className='w-full overflow-x-auto'>
                            <div className="min-w-[600px] h-[500px]">
                                 <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                data={bookswithLoansReservations}
                                                >
                                                <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
                                                <XAxis
                                                    dataKey="isbn"
                                                    angle={-35}
                                                    textAnchor="end"
                                                    height={180}
                                                />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip
                                                 content={({ payload }) => {
                                                    if (!payload || !payload.length) return null;

                                                    const book = payload[0].payload;
                                                    return (
                                                        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                                                            <strong className="block text-gray-800">{book.title}</strong>
                                                            <span className="text-gray-600">Tots: {book.total}</span>
                                                        </div>
                                                    );
                                                }}
                                                    cursor = {{fill: 'rgba(120, 120, 120, 0.1)'}}
                                                    labelClassName='font-bold dark:text-gray-800 font-bold '
                                                    contentStyle={{
                                                    borderRadius: '8px',
                                                    border: '1px solid #e5e7eb',
                                                    background: 'white',


                                                    }}
                                                />
                                                <Legend
                                                />
                                                <Bar
                                                 dataKey="total"
                                                 fill="#F97316"
                                                 name={t("ui.charts.book.total")}
                                                 />
                                                </BarChart>
                                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </ChartsLayout>

    );
}

