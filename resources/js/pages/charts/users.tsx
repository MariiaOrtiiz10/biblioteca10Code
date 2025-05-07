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
                <BarChart
                data={usersWithLoansReservation}
                >
                <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
                <XAxis
                    dataKey="email"
                    angle={-35}
                    textAnchor="end"
                    height={150}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
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
                 dataKey="loans_count"
                 fill="#F97316"
                 name={t("ui.charts.user.loans")}
                 />
                <Bar dataKey="reservations_count" fill="#3B82F6" name={t("ui.charts.user.reservations")} />
                <Bar dataKey="total" fill="#10B981" name={t("ui.charts.user.total")} />
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
            <div className="h-[370px]">
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
                            '#10B981', // Verde
                            '#3B82F6', // Azul
                            '#8B5CF6', // Violeta
                            '#EF4444', // Rojo
                            '#F97316', // Naranja
                            '#EAB308'  // Amarillo
                          ][index % 6]}
                        />
                    ))}
                    </Pie>
                    <Tooltip
                    formatter={(value, email , props) => [
                        `${value} ${t("ui.charts.user.loans")}`,
                        props.payload.name,
                    ]}
                    />
                    <Legend
                    layout="vertical"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value, entry, index) => (
                        <span className="text-sm text-gray-600">
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
            <div className="h-[370px]">
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
                            '#10B981', // Verde
                            '#3B82F6', // Azul
                            '#8B5CF6', // Violeta
                            '#EF4444', // Rojo
                            '#F97316', // Naranja
                            '#EAB308'  // Amarillo
                          ][index % 6]}
                        />
                    ))}
                    </Pie>
                    <Tooltip
                    formatter={(value, name, props) => [
                        `${value} ${t("ui.charts.user.reservations")}`,
                        props.payload.name,
                    ]}
                    />
                    <Legend
                    layout="vertical"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value, entry, index) => (
                        <span className="text-sm text-gray-600">
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

