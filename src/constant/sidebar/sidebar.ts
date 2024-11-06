import { HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiHome } from 'react-icons/hi';
import { IconType } from 'react-icons';
import { getUser } from '@/hooks/auth/authClient';

export interface MenuItem {
    key: string;
    title: string;
    path: string;
    icon: IconType;
    condition?: boolean;
}

export function getMenu(): MenuItem[] {

    const user = getUser();

    const roleAlumni: boolean | undefined = user?.roles?.includes('alumni');
    const roleAdmin: boolean | undefined = user?.roles?.includes('admin');
    const roleMahasiswa: boolean | undefined = user?.roles?.includes('mahasiswa');

    const menu = [
        {
            key: 'dashboard',
            title: "Dashboard",
            path: '/dashboard',
            icon: HiHome,  
            condition: roleAlumni || roleAdmin || roleMahasiswa ,
        },
        {
            key: 'statistic',
            title: "Statistik",
            path: '/dashboard/statistic',
            icon: HiChartPie,
            condition: roleAdmin,
        },
        {
            key: 'tracerStudy',
            title: "Tracer Study",
            path: '/dashboard/tracer-study',
            icon: HiInbox,
            condition: roleAdmin,
        },
        {
            key: 'alumni',
            title: "Alumni",
            path: '/dashboard/alumni',
            icon: HiShoppingBag,
            condition: roleAlumni,
        },
        {
            key: 'dataAlumni',
            title: "Data Alumni",
            path: '/dashboard/data-alumni',
            icon: HiShoppingBag,
            condition: roleAdmin,
        },
        {
            key: 'loker',
            title: "Lowongan Kerja",
            path: '/dashboard/loker',
            icon: HiTable,
            condition: roleAlumni || roleAdmin || roleMahasiswa,
        },
        {
            key: 'logang',
            title: "Lowongan Magang",
            path: '/dashboard/logang',
            icon: HiUser,
            condition: roleAlumni || roleAdmin || roleMahasiswa,
        },
        {
            key: 'announcement',
            title: "Pengumuman",
            path: '/dashboard/announcement',
            icon: HiViewBoards,
            condition: roleAlumni || roleAdmin || roleMahasiswa,
        },
    ];

    const filterMenu = menu.filter((item) => item.condition);

    return filterMenu;
}
