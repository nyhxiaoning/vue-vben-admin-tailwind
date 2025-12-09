<script lang="ts" setup>
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElMessage, ElTag } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getMenuListApi } from '#/api/system';

const [MenuDrawer, drawerApi] = useVbenDrawer({
  onConfirm: async () => {
    await formApi.validate();
    ElMessage.success('Saved successfully');
    drawerApi.close();
  },
  onOpenChange: (isOpen) => {
    if (isOpen) {
      const { isUpdate, values } = drawerApi.getData() || {};
      setTimeout(() => {
        if (isUpdate) {
          formApi.setValues(values);
        } else {
          formApi.resetForm();
          if (values && values.parentId) {
            formApi.setValues({ parentId: values.parentId });
          }
        }
      }, 200);
    }
  },
});

const [Form, formApi] = useVbenForm({
  layout: 'horizontal',
  wrapperClass: 'grid-cols-2',
  schema: [
    {
      component: 'RadioGroup',
      fieldName: 'type',
      label: '类型',
      defaultValue: '1',
      formItemClass: 'col-span-2',
      componentProps: {
        isButton: true,
        options: [
          { label: '目录', value: '0' },
          { label: '菜单', value: '1' },
          { label: '按钮', value: '2' },
          { label: '内嵌', value: '3' },
          { label: '外链', value: '4' },
        ],
      },
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: '菜单名称',
      rules: 'required',
      componentProps: { placeholder: '请输入' },
    },
    {
      component: 'TreeSelect',
      fieldName: 'parentId',
      label: '上级菜单',
      componentProps: {
        placeholder: '请选择',
        data: [],
      },
    },
    {
      component: 'Input',
      fieldName: 'title_display',
      label: '标题',
      rules: 'required',
      componentProps: { placeholder: '请输入' },
    },
    {
      component: 'Input',
      fieldName: 'path',
      label: '路由地址',
      rules: 'required',
      componentProps: { placeholder: '请输入' },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Input',
      fieldName: 'activePath',
      label: '激活路径',
      help: '激活路径说明',
      componentProps: { placeholder: '请输入' },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2' && values.type !== '0',
      },
    },
    {
      component: 'Select',
      fieldName: 'activeIcon',
      label: '激活图标',
      componentProps: {
        placeholder: '请选择',
        options: [],
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2' && values.type !== '0',
      },
    },
    {
      component: 'Select',
      fieldName: 'icon',
      label: '图标',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: 'Settings', value: 'lucide:settings' },
          { label: 'User', value: 'lucide:user' },
          { label: 'Menu', value: 'lucide:menu' },
        ],
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Input',
      fieldName: 'component',
      label: '页面组件',
      rules: 'required',
      componentProps: { placeholder: '请输入' },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type === '1',
      },
    },
    {
      component: 'Input',
      fieldName: 'link',
      label: '链接地址',
      rules: 'required',
      componentProps: { placeholder: '请输入' },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type === '4',
      },
    },
    {
      component: 'Input',
      fieldName: 'permission',
      label: '权限标识',
      componentProps: { placeholder: '请输入' },
      dependencies: {
        triggerFields: ['type'],
        show: (values) =>
          values.type !== '0' && values.type !== '3' && values.type !== '4',
      },
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: '状态',
      defaultValue: '1',
      componentProps: {
        isButton: true,
        options: [
          { label: '已启用', value: '1' },
          { label: '已禁用', value: '0' },
        ],
      },
    },
    {
      component: 'Select',
      fieldName: 'badgeType',
      label: '徽章类型',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: 'Dot', value: 'dot' },
          { label: 'Normal', value: 'normal' },
        ],
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Input',
      fieldName: 'badgeContent',
      label: '徽章内容',
      componentProps: { placeholder: '请输入' },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Select',
      fieldName: 'badgeStyle',
      label: '徽章样式',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Error', value: 'error' },
        ],
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Divider',
      fieldName: 'divider',
      label: '其它设置',
      formItemClass: 'col-span-2',
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Checkbox',
      fieldName: 'keepAlive',
      label: '缓存标签页',
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type === '1',
      },
    },
    {
      component: 'Checkbox',
      fieldName: 'affix',
      label: '固定在标签',
      dependencies: {
        triggerFields: ['type'],
        show: (values) =>
          values.type !== '2' && values.type !== '0' && values.type !== '4',
      },
    },
    {
      component: 'Checkbox',
      fieldName: 'hideMenu',
      label: '隐藏菜单',
      dependencies: {
        triggerFields: ['type'],
        show: (values) => values.type !== '2',
      },
    },
    {
      component: 'Checkbox',
      fieldName: 'hideChildren',
      label: '隐藏子菜单',
      dependencies: {
        triggerFields: ['type'],
        show: (values) =>
          values.type !== '2' && values.type !== '3' && values.type !== '4',
      },
    },
    {
      component: 'Checkbox',
      fieldName: 'hideBreadcrumb',
      label: '在面包屑中隐藏',
      dependencies: {
        triggerFields: ['type'],
        show: (values) =>
          values.type !== '2' && values.type !== '0' && values.type !== '4',
      },
    },
    {
      component: 'Checkbox',
      fieldName: 'hideTab',
      label: '在标签栏中隐藏',
      dependencies: {
        triggerFields: ['type'],
        show: (values) =>
          values.type !== '2' && values.type !== '0' && values.type !== '4',
      },
    },
  ],
  showDefaultActions: false,
});

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        component: 'Input',
        fieldName: 'title',
        label: '菜单名称',
      },
      {
        component: 'Select',
        fieldName: 'status',
        label: '状态',
        componentProps: {
          options: [
            { label: '已启用', value: '1' },
            { label: '已禁用', value: '0' },
          ],
        },
      },
    ],
  },
  gridOptions: {
    columns: [
      { field: 'title', title: '标题', treeNode: true, width: 250 },
      {
        field: 'type',
        title: '类型',
        width: 100,
        slots: { default: 'type' },
      },
      { field: 'permission', title: '权限标识', width: 150 },
      { field: 'path', title: '路由地址', minWidth: 150 },
      { field: 'component', title: '页面组件', minWidth: 200 },
      {
        title: '操作',
        slots: { default: 'action' },
        width: 250,
        fixed: 'right',
      },
    ],
    treeConfig: {
      transform: false,
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children',
    },
    proxyConfig: {
      ajax: {
        query: async ({ page, form }) => {
          return await getMenuListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
        },
      },
    },
  },
});
// console.log(gridApi);

function handleAdd() {
  drawerApi.setData({ isUpdate: false });
  drawerApi.open();
  drawerApi.setState({ title: '新增菜单' });
}

function handleEdit(row: any) {
  drawerApi.setData({ isUpdate: true, values: row });
  drawerApi.open();
  drawerApi.setState({ title: '修改菜单' });
}

function handleDelete(row: any) {
  ElMessage.success(`删除菜单: ${row.title}`);
}

function handleAddChild(row: any) {
  drawerApi.setData({ isUpdate: false, values: { parentId: row.id } });
  drawerApi.open();
  drawerApi.setState({ title: '新增下级菜单' });
}
</script>

<template>
  <Page title="菜单管理" :auto-content-height="true">
    <template #extra>
      <ElButton type="primary" @click="handleAdd">
        <span class="icon-[lucide--plus] mr-1"></span>
        新增菜单
      </ElButton>
    </template>
    <Grid>
      <template #type="{ row }">
        <ElTag v-if="row.children && row.children.length > 0" effect="plain">
          目录
        </ElTag>
        <ElTag v-else type="info" effect="plain"> 菜单 </ElTag>
      </template>
      <template #action="{ row }">
        <ElButton link type="primary" @click="handleAddChild(row)">
          新增下级
        </ElButton>
        <ElButton link type="primary" @click="handleEdit(row)">修改</ElButton>
        <ElButton link type="danger" @click="handleDelete(row)">删除</ElButton>
      </template>
    </Grid>
    <MenuDrawer title="新增菜单" class="w-[800px]">
      <Form />
    </MenuDrawer>
  </Page>
</template>
