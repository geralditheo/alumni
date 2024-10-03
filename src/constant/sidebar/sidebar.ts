import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { IconType } from 'react-icons';

interface MenuItem {
    key: string;
    title: string;
    path: string;
    icon: IconType;
    condition?: string;
}

export function getMenu(): MenuItem[] {
    return [
        {
            key: 'dashboard',
            title: "Dashboard",
            path: '/dashboard',
            icon: HiArrowSmRight,  
            condition: '',
        },
        {
            key: 'statistic',
            title: "Statistik",
            path: '/dashboard/statistic',
            icon: HiChartPie,
            condition: '',
        },
        {
            key: 'tracerStudy',
            title: "Tracer Study",
            path: '/dashboard/tracer-study',
            icon: HiInbox,
            condition: '',
        },
        {
            key: 'alumni',
            title: "Alumni",
            path: '/dashboard/alumni',
            icon: HiShoppingBag,
            condition: '',
        },
        {
            key: 'loker',
            title: "Lowongan Kerja",
            path: '/dashboard/loker',
            icon: HiTable,
            condition: '',
        },
        {
            key: 'logang',
            title: "Lowongan Magang",
            path: '/dashboard/logang',
            icon: HiUser,
            condition: '',
        },
        {
            key: 'announcement',
            title: "Pengumuman",
            path: '/dashboard/announcement',
            icon: HiViewBoards,
            condition: '',
        },
    ];
}
