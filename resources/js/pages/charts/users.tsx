import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from "@/types";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, Typography, Chip, Stack, Box, Divider, useMediaQuery } from '@mui/material';
import {ArrowUpDown,  BookOpen, Calendar, Clock, CheckCircle, XCircle, Tag , Hourglass, User, Undo2, BookUp} from "lucide-react";
import ChartsLayout from '@/layouts/charts/chartsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import React, { PureComponent } from 'react';


interface EditUserProps extends PageProps {
    usersWithLoansReservation: any[];
    usersWithLoans: any[];
    usersWithReservations: any[];
}

export default function Users({usersWithLoansReservation, usersWithLoans, usersWithReservations} :EditUserProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth < 1400);
            setIsMobile(window.innerWidth < 767);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        }, []);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.charts.user.title'),
            href: '/charts/users',
        },
    ];
    console.log(usersWithLoans);

    return (
        <ChartsLayout title={t('ui.charts.user.title')}>
            <Head title={t('ui.charts.user.title')}/>
            <div className="w-full px-2 mx-auto">
  <div className="mb-2">
    <HeadingSmall
      title={t('ui.charts.user.title')}
      description={t('')}
    />
    </div>
    <div className=''>
        {/* Gráfico de barras */}
        <div className="w-full overflow-x-auto mt-8">
            <div className='w-full overflow-x-auto'>
            <div className="min-w-[600px] h-[460px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usersWithLoansReservation}>
                <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
                <XAxis
                    dataKey="email"
                    angle={-35}
                    textAnchor="end"
                    height={75}
                    tickFormatter={(value, index) => `TOP ${index + 1}`}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                cursor={{ fill: 'rgba(120, 120, 120, 0.1)' }}
                labelClassName="font-bold dark:text-gray-800"
                contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: 'white',
                }}
                content={({ payload, label }) => {
                    if (!payload || payload.length === 0) return null;
                    const data = payload[0].payload;
                    return (
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                        <p className="font-bold text-gray-800 mb-2">{label}</p>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 dark:text-gray-800">
                            <User></User>
                            <span>{data.name}</span>
                        </div>
                        <div className="flex items-center gap-2 dark:text-gray-600">
                            <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                            <span>{t("ui.charts.user.loans")}: {data.loans_count}</span>
                        </div>
                        <div className="flex items-center gap-2 dark:text-gray-800">
                            <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                            <span>{t("ui.charts.user.reservations")}: {data.reservations_count}</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold dark:text-gray-800">
                            <span>{t("ui.charts.user.total")}: {data.total}</span>
                        </div>
                        </div>
                    </div>
                    );
                }}
                />
                <Legend />
                <Bar
                    dataKey="loans_count"
                    stackId="a"
                    fill="#F97316"
                    name={t("ui.charts.user.loans")}
                />
                <Bar
                    dataKey="reservations_count"
                    stackId="a"
                    fill="#3B82F6"
                    name={t("ui.charts.user.reservations")}
                />
                </BarChart>
            </ResponsiveContainer>
            </div>
            </div>
        </div>
        <div className="py-3"></div>
        <hr className="dark:border-grey "></hr>
        <div className="py-3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Pie chart de loans */}
            <div className="p-4 border rounded-xl shadow-sm">
            <h3 className="text-gray-800 mb-4 dark:text-gray-200">
                {t("ui.charts.user.topLoans")}
            </h3>
            <div className="h-[375px]">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={usersWithLoans}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="loans_count"
                    nameKey="email"
                    >
                    {usersWithLoans.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={[
                            '#FF0000',
                            '#FFFF00',
                            '#00FF00',
                            '#008000',
                            '#00FFFF',
                            '#000080',
                            '#FF00FF',
                            '#800080'
                          ][index % 8]}
                        />
                    ))}
                    </Pie>
                    <Tooltip
                      labelClassName="font-bold dark:text-gray-800"
                      content={({ payload, label }) => {
                        if (!payload || payload.length === 0) return null;
                        const data = payload[0].payload;
                        console.log("data", data)
                        return (
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                            <p className="font-bold text-gray-800 mb-2">{label}</p>
                            <div className="flex items-center gap-2 dark:text-gray-800">
                                <span className='font-bold'>{data.name}:</span>{data.loans_count} {t("ui.charts.user.loans")}
                            </div>
                        </div>
                        );
                    }}
                    />
                    <Legend
                    layout="vertical"
                    verticalAlign={isTablet && !isMobile ? "bottom" : "middle"}
                    align={isTablet && !isMobile ? "center" : "right"}
                    wrapperStyle={isTablet && !isMobile ? { paddingTop: '20px' } : {}}
                    formatter={(value, entry, index) => (
                        <span className="text-sm text-gray-900 dark:text-gray-200">
                        <strong>{usersWithLoans[index]?.email}</strong>
                        </span>
                    )}
                    />
                </PieChart>
                </ResponsiveContainer>
            </div>
            </div>

            {/* Pie chart de reservas */}
            <div className="p-4 border rounded-xl shadow-sm">
            <h3 className="text-gray-800 mb-4 dark:text-gray-200">
                {t("ui.charts.user.topReservations")}
            </h3>
            <div className="h-[375px]">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={usersWithReservations}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="reservations_count"
                    nameKey="email"
                    >
                    {usersWithReservations.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={[
                            '#FF0000',
                            '#FFFF00',
                            '#00FF00',
                            '#008000',
                            '#00FFFF',
                            '#000080',
                            '#FF00FF',
                            '#800080'
                          ][index % 8]}
                        />
                    ))}
                    </Pie>
                    <Tooltip
                      labelClassName="font-bold dark:text-gray-800"
                      content={({ payload, label }) => {
                        if (!payload || payload.length === 0) return null;
                        const data = payload[0].payload;
                        console.log("data", data)
                        return (
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                            <p className="font-bold text-gray-800 mb-2">{label}</p>
                            <div className="flex items-center gap-2 dark:text-gray-800">
                                <span className='font-bold'>{data.name}:</span>{data.reservations_count} {t("ui.charts.user.reservations")}
                            </div>
                        </div>
                        );
                    }}
                    />
                     <Legend
                    layout="vertical"
                    verticalAlign={isTablet && !isMobile ? "bottom" : "middle"}
                    align={isTablet && !isMobile ? "center" : "right"}
                    wrapperStyle={isTablet && !isMobile ? { paddingTop: '20px' } : {}}
                    formatter={(value, entry, index) => (
                        <span className="text-sm text-gray-900 dark:text-gray-200">
                        <strong>{usersWithReservations[index]?.email}</strong>
                        </span>
                    )}
                    />
                </PieChart>
                </ResponsiveContainer>
            </div>
            </div>
        </div>
        </div>
        </div>
        </ChartsLayout>

    );
}

