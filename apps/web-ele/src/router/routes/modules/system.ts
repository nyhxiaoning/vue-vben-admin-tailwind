import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        meta: {
            icon: 'lucide:settings',
            title: '系统管理',
            order: 2000,
        },
        name: 'System',
        path: '/system',
        children: [
            {
                name: 'SystemRole',
                path: '/system/role',
                component: () => import('#/views/system/role/index.vue'),
                meta: {
                    icon: 'lucide:user-cog',
                    title: '角色管理',
                },
            },
            {
                name: 'SystemMenu',
                path: '/system/menu',
                component: () => import('#/views/system/menu/index.vue'),
                meta: {
                    icon: 'lucide:menu',
                    title: '菜单管理',
                },
            },
            {
                name: 'SystemDept',
                path: '/system/dept',
                component: () => import('#/views/system/dept/index.vue'),
                meta: {
                    icon: 'lucide:layers',
                    title: '部门管理',
                },
            },
        ],
    },
];

export default routes;
