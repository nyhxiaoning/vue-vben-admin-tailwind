export namespace SystemApi {
  export interface Role {
    id: string;
    roleName: string;
    roleValue: string;
    status: '0' | '1';
    remark?: string;
    createTime: string;
  }

  export interface Menu {
    id: string;
    parentId?: string;
    title: string;
    path: string;
    component?: string;
    icon?: string;
    order: number;
    status: '0' | '1';
    createTime: string;
    children?: Menu[];
  }

  export interface Dept {
    id: string;
    parentId?: string;
    deptName: string;
    order: number;
    status: '0' | '1';
    remark?: string;
    createTime: string;
    children?: Dept[];
  }
}

// Generate more mock data
const generateRoles = (): SystemApi.Role[] => {
  const baseRoles: SystemApi.Role[] = [
    {
      id: '9d773fef-749d-4d2c-bf28-1234567890ab',
      roleName: 'Pants',
      roleValue: 'pants',
      status: '1',
      remark: 'Colo sonitus abeo utor abscido difli...',
      createTime: '2024/03/30 05:31:19',
    },
    {
      id: '28c2a65a-a7e9-485d-896f-abcdef123456',
      roleName: 'Chicken',
      roleValue: 'chicken',
      status: '1',
      remark: 'Caries suppellex sit mollitia sequi.',
      createTime: '2024/03/17 04:55:54',
    },
    {
      id: 'd0b4a7be-6a3d-45a0-94e0-7890abcdef12',
      roleName: 'Towels',
      roleValue: 'towels',
      status: '0',
      remark: 'Ratione cognatus aufero.',
      createTime: '2023/08/18 13:15:41',
    },
    {
      id: '4bcea412-9530-4672-ab80-34567890abcd',
      roleName: 'Pants',
      roleValue: 'pants_2',
      status: '1',
      remark: 'Adulescens sublime sortitus carcer ...',
      createTime: '2022/11/24 21:22:31',
    },
    {
      id: '164a0468-da46-4eb1-8299-567890abcdef',
      roleName: 'Gloves',
      roleValue: 'gloves',
      status: '1',
      remark: 'Res virto atavus crebro defero villa...',
      createTime: '2024/07/01 01:36:26',
    },
    {
      id: 'fa5131fe-cf69-4215-a9d3-90abcdef1234',
      roleName: 'Soap',
      roleValue: 'soap',
      status: '1',
      remark: 'Ducimus aliqua vomer consectetur t...',
      createTime: '2023/12/23 13:57:25',
    },
    {
      id: '14199815-3b7d-4aa3-8dc9-cdef12345678',
      roleName: 'Table',
      roleValue: 'table',
      status: '0',
      remark: 'Alias audeo terra debitis suspendo s...',
      createTime: '2024/09/27 03:22:56',
    },
    {
      id: '63dcd8a6-dea7-4748-9dc9-ef1234567890',
      roleName: 'Chips',
      roleValue: 'chips',
      status: '0',
      remark: 'Voluptatem voluptate ascit absens s...',
      createTime: '2024/09/11 08:23:06',
    },
    {
      id: '446590df-419b-495b-8ede-1234567890ab',
      roleName: 'Pizza',
      roleValue: 'pizza',
      status: '0',
      remark: 'Cenaculum canto dens ciminatio am...',
      createTime: '2022/07/24 09:31:05',
    },
  ];

  // Generate more to reach ~100
  const roles: SystemApi.Role[] = [...baseRoles];
  for (let i = 0; i < 90; i++) {
    roles.push({
      id: `generated-uuid-${i}`,
      roleName: `Role ${i}`,
      roleValue: `role_${i}`,
      status: Math.random() > 0.5 ? '1' : '0',
      remark: `Generated remark ${i}`,
      createTime: '2024/01/01 00:00:00',
    });
  }
  return roles;
};

const roles = generateRoles();

// Real menu structure based on routes
const menus: SystemApi.Menu[] = [
  {
    id: '1',
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'lucide:layout-dashboard',
    order: 1,
    status: '1',
    createTime: '2024-01-01 12:00:00',
    children: [
      {
        id: '1-1',
        parentId: '1',
        title: 'Analytics',
        path: '/dashboard/analytics',
        component: '/dashboard/analytics/index',
        icon: 'lucide:area-chart',
        order: 1,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '1-2',
        parentId: '1',
        title: 'Workspace',
        path: '/dashboard/workspace',
        component: '/dashboard/workspace/index',
        icon: 'carbon:workspace',
        order: 2,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
    ],
  },
  {
    id: '2',
    title: 'System Management',
    path: '/system',
    icon: 'lucide:settings',
    order: 2,
    status: '1',
    createTime: '2024-01-01 12:00:00',
    children: [
      {
        id: '2-1',
        parentId: '2',
        title: 'Role Management',
        path: '/system/role',
        component: '/system/role/index',
        icon: 'lucide:user-cog',
        order: 1,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '2-2',
        parentId: '2',
        title: 'Menu Management',
        path: '/system/menu',
        component: '/system/menu/index',
        icon: 'lucide:menu',
        order: 2,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '2-3',
        parentId: '2',
        title: 'Dept Management',
        path: '/system/dept',
        component: '/system/dept/index',
        icon: 'lucide:layers',
        order: 3,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
    ],
  },
  {
    id: '3',
    title: 'Demos',
    path: '/demos',
    icon: 'ic:baseline-view-in-ar',
    order: 3,
    status: '1',
    createTime: '2024-01-01 12:00:00',
    children: [
      {
        id: '3-1',
        parentId: '3',
        title: 'Element Plus',
        path: '/demos/element',
        component: '/demos/element/index',
        order: 1,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '3-2',
        parentId: '3',
        title: 'Form',
        path: '/demos/form',
        component: '/demos/form/basic',
        order: 2,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
    ],
  },
  {
    id: '4',
    title: 'Vben Admin',
    path: '/vben-admin',
    icon: 'logos:vben-admin',
    order: 4,
    status: '1',
    createTime: '2024-01-01 12:00:00',
    children: [
      {
        id: '4-1',
        parentId: '4',
        title: 'Document',
        path: '/vben-admin/document',
        icon: 'lucide:book-open-text',
        order: 1,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '4-2',
        parentId: '4',
        title: 'Github',
        path: '/vben-admin/github',
        icon: 'mdi:github',
        order: 2,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '4-3',
        parentId: '4',
        title: 'About',
        path: '/vben-admin/about',
        icon: 'lucide:copyright',
        order: 3,
        status: '1',
        createTime: '2024-01-01 12:00:00',
      },
    ],
  },
];

const depts: SystemApi.Dept[] = [
  {
    id: '1',
    deptName: 'Headquarters',
    order: 1,
    status: '1',
    remark: 'Main Headquarters',
    createTime: '2024-01-01 12:00:00',
    children: [
      {
        id: '1-1',
        parentId: '1',
        deptName: 'R&D Department',
        order: 1,
        status: '1',
        remark: 'Research and Development',
        createTime: '2024-01-01 12:00:00',
      },
      {
        id: '1-2',
        parentId: '1',
        deptName: 'Marketing Department',
        order: 2,
        status: '1',
        remark: 'Marketing and Sales',
        createTime: '2024-01-01 12:00:00',
      },
    ],
  },
];

export const getRoleListApi = (params?: any) => {
  const {
    page = 1,
    pageSize = 20,
    roleName,
    status,
    createTime,
  } = params || {};
  console.log('getRoleListApi', params);
  let result = [...roles];

  // Mock filtering
  if (roleName) {
    result = result.filter((item) =>
      item.roleName.toLowerCase().includes(roleName.toLowerCase()),
    );
  }
  if (status) {
    result = result.filter((item) => item.status === status);
  }
  if (createTime && Array.isArray(createTime) && createTime.length === 2) {
    const [startTime, endTime] = createTime;
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    result = result.filter((item) => {
      const itemTime = new Date(item.createTime).getTime();
      return itemTime >= start && itemTime <= end;
    });
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = result.slice(start, end);

  return Promise.resolve({
    items,
    total: result.length,
  });
};

export const getMenuListApi = (params?: any) => {
  console.log('getMenuListApi', params);
  return Promise.resolve({
    items: menus,
    total: menus.length,
  });
};

export const getDeptListApi = (params?: any) => {
  console.log('getDeptListApi', params);
  return Promise.resolve({
    items: depts,
    total: depts.length,
  });
};
