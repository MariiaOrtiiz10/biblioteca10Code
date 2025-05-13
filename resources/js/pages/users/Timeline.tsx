import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { PageProps } from "@/types";
import { Mail, User, ArrowUpDown,  BookOpen, Calendar, Clock, CheckCircle, XCircle, Tag , Hourglass, Undo2, BookUp, Trash2 } from "lucide-react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Box, Chip, Divider, Typography } from "@mui/material";


interface IndexTimelineUser extends PageProps {
    user: {
        id: string;
        name: string;
        email: string;
      };
    loans: any[];
    reservations: any[];

}


export default function TimelineUser({user, loans, reservations}:IndexTimelineUser) {

  const { t } = useTranslations();
//   console.log("loans:", loans)
//   console.log("reservations:", reservations)
   const [filter, setFilter] = useState('all');
      const filteredItems = [...reservations.map(reservation => ({
          ...reservation,
          type: 'reservation' as const,
          sortDate: new Date(reservation.created_at)
      })), ...loans.map(loan => ({
          ...loan,
          type: 'loan' as const,
          sortDate: new Date(loan.start_date)
      }))]
      .filter(item => {
          if (filter === 'all') return true;
          return item.type === filter;
      })
      .sort((a, b) => b.sortDate - a.sortDate);

      const COLOR_PENDING = '#FFD54F';
      const COLOR_ON_TIME = '#81C784';
      const COLOR_LATE = '#FF8A65';



  return (
    <UserLayout title={t("ui.us.timeline.title")}>
    <div className="px-4 py-6">
    <div className="flex justify-center">
        <div className="border shadow rounded-2xl p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("ui.us.timeline.user")}:
            </h2>
            <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <User className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-medium">{user.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-lg">{user.email}</span>
            </div>
            </div>
        </div>
        </div>

        <div className="py-4"></div>

    <div className="border shadow rounded-2xl flex-1 w-full px-4 md:px-6 xl:px-8 mx-auto">
        <div className="flex flex-wrap gap-2 justify-center my-4">
        <Button variant={filter === 'all' ? "default" : "outline"} onClick={() => setFilter("all")}>
            {t('ui.timeline.filter.all')}
        </Button>
        <Button variant={filter === 'reservation' ? "default" : "outline"} onClick={() => setFilter("reservation")}>
            {t('ui.timeline.filter.reservation')}
        </Button>
        <Button variant={filter === 'loan' ? "default" : "outline"} onClick={() => setFilter("loan")}>
            {t('ui.timeline.filter.loans')}
        </Button>
        </div>
        <VerticalTimeline lineColor='#888888'>
                            {filteredItems.map((item, index) => {
                                        if (item.type === 'reservation') {
                                            const { book } = item;
                                            const dateOnly = item.created_at.split('T')[0];
                                            const timeOnly = item.created_at.split('T')[1].substring(0, 8);
                                            const isDeleted = !!item.deleted_at;
                                            return (
                                                <VerticalTimelineElement
                                                    key={`res-${index}`}
                                                    contentStyle={{
                                                        background: isDeleted ? '#fef2f2' : '#f0f4ff', // Rojo claro para eliminadas, azul claro para normales
                                                        color: isDeleted ? '#991b1b' : '#1e3a8a',
                                                        borderRadius: '12px',
                                                        border: isDeleted ? '1px solid #fecaca' : '1px solid #dbeafe',
                                                    }}
                                                    contentArrowStyle={{
                                                        borderRight: `8px solid ${isDeleted ? '#fef2f2' : '#f0f4ff'}`,
                                                    }}
                                                    icon={<BookUp />}
                                                    iconStyle={{
                                                        background: isDeleted ? '#ef4444' : '#3b82f6', // Rojo para eliminadas, azul para normales
                                                        color: '#fff',
                                                    }}
                                                    date={
                                                        <span className={`m-2 font-bold hidden lg:inline ${isDeleted ? 'text-red-700' : 'text-blue-700'}`}>
                                                        {dateOnly}
                                                        </span>
                                                    }
                                                    >
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <BookOpen size={24} style={{ color: isDeleted ? "#991b1b" : "#1e3a8a", flexShrink: 0 }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 600, color: isDeleted ? "#991b1b" : "#1e3a8a" }}>
                                                            {book.title}
                                                        </Typography>
                                                        {isDeleted && (
                                                            <Chip
                                                            label={t("ui.timeline.deleted")}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#fee2e2',
                                                                color: '#b91c1c',
                                                                ml: 1
                                                            }}
                                                            />
                                                        )}
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: isDeleted ? "#6b7280" : "#374151" }}>
                                                        <User size={20} />
                                                        <strong>{t("ui.timeline.author")}:</strong> {book.author}
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: isDeleted ? "#6b7280" : "#374151" }}>
                                                        <Calendar size={20} />
                                                        <strong>
                                                            {isDeleted
                                                            ? t("ui.timeline.start_reservation")
                                                            : t("ui.timeline.start_reservation")}:
                                                        </strong> {dateOnly} {timeOnly}
                                                        </Box>
                                                        {isDeleted && item.deleted_at && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: "#6b7280" }}>
                                                            <Trash2 size={20} />
                                                            <strong>{t("ui.timeline.deleted_at")}:</strong> {item.deleted_at.split('T')[0]}
                                                        </Box>
                                                        )}
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


    </UserLayout>
  );
}
