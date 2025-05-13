import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from "@/types";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, Typography, Chip, Stack, Box, Divider, useMediaQuery } from '@mui/material';
import {ArrowUpDown,  BookOpen, Calendar, Clock, CheckCircle, XCircle, Tag , Hourglass, User, Undo2, BookUp, Barcode} from "lucide-react";
import ChartsLayout from '@/layouts/charts/chartsLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';


interface EditBookProps extends PageProps {
    bookswithLoansReservations: any[];
    bookswithLoans: any[];
    bookswithReservations: any[];
}

export default function Books({bookswithLoansReservations, bookswithLoans, bookswithReservations}:EditBookProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    console.log(bookswithLoans);
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
                                            height={75}
                                            tickFormatter={(value, index) => `TOP ${index + 1}`}
                                        />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip
                                            content={({ payload }) => {
                                            if (!payload || !payload.length) return null;
                                            const book = payload[0].payload;
                                            return (
                                                <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                                                    <strong className="block text-gray-800">{book.title}</strong>
                                                <div className="flex items-center gap-2 dark:text-gray-800">
                                                    <Barcode></Barcode>
                                                    <span>{t("ui.charts.book.isbn")}: {book.isbn}</span>
                                                </div>
                                                <div className="flex items-center gap-2 dark:text-gray-600">
                                                    <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                                                    <span>{t("ui.charts.book.loans")}: {book.loans_count}</span>
                                                </div>
                                                <div className="flex items-center gap-2 dark:text-gray-800">
                                                    <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                                                    <span>{t("ui.charts.book.reservations")}: {book.reservations_count}</span>
                                                </div>

                                                <div className="flex items-center gap-2 font-bold dark:text-gray-800">
                                                    <span>{t("ui.charts.book.total")}: {book.total}</span>
                                                </div>
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
                                            dataKey="loans_count"
                                            stackId="a"
                                            fill="#F97316"
                                            name={t("ui.charts.book.loans")}
                                        />
                                        <Bar
                                            dataKey="reservations_count"
                                            stackId="a"
                                            fill="#3B82F6"
                                            name={t("ui.charts.book.reservations")}
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
                            <div className="p-4 border rounded-xl shadow-sm">
                                <h3 className="text-gray-800 mb-4 dark:text-gray-200">
                                    {t("ui.charts.book.topLoans")}
                                </h3>
                                <div className={isTablet && !isMobile ? 'h-[400px]' : 'h-[375px]'}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                            data={bookswithLoans}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey="loans_count"
                                            nameKey="isbn"
                                            >
                                            {bookswithLoans.map((entry, index) => (
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
                                                        <span className='font-bold'>{data.title}:</span>{data.loans_count} {t("ui.charts.book.loans")}
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
                                                <strong>{bookswithLoans[index]?.title}</strong>
                                                </span>
                                            )}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>

                                </div>
                            </div>
                            <div className="p-4 border rounded-xl shadow-sm">
                                <h3 className="text-gray-800 mb-4 dark:text-gray-200">
                                    {t("ui.charts.book.topReservations")}
                                </h3>
                                <div className={isTablet && !isMobile ? 'h-[400px]' : 'h-[375px]'}>
                                <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                            data={bookswithReservations}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey="reservations_count"
                                            nameKey="isbn"
                                            >
                                            {bookswithReservations.map((entry, index) => (
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
                                                        <span className='font-bold'>{data.title}:</span>{data.reservations_count}  {t("ui.charts.book.reservations")}
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
                                                <strong>{bookswithReservations[index]?.title}</strong>
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

