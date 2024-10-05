import { HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiHome } from 'react-icons/hi';
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
            icon: HiHome,  
            condition: 'admin | alumni | mahasiswa ',
        },
        {
            key: 'statistic',
            title: "Statistik",
            path: '/dashboard/statistic',
            icon: HiChartPie,
            condition: 'admin',
        },
        {
            key: 'tracerStudy',
            title: "Tracer Study",
            path: '/dashboard/tracer-study',
            icon: HiInbox,
            condition: 'admin | alumni',
        },
        {
            key: 'alumni',
            title: "Alumni",
            path: '/dashboard/alumni',
            icon: HiShoppingBag,
            condition: 'admin | alumni',
        },
        {
            key: 'loker',
            title: "Lowongan Kerja",
            path: '/dashboard/loker',
            icon: HiTable,
            condition: 'admin | alumni | mahasiswa ',
        },
        {
            key: 'logang',
            title: "Lowongan Magang",
            path: '/dashboard/logang',
            icon: HiUser,
            condition: 'admin | alumni | mahasiswa',
        },
        {
            key: 'announcement',
            title: "Pengumuman",
            path: '/dashboard/announcement',
            icon: HiViewBoards,
            condition: 'admin | mahasiswa | alumni',
        },
    ];
}
