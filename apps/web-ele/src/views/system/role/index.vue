<script lang="ts" setup>
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElMessage, ElSwitch, ElTag } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getAllMenusApi } from '#/api';
import { getRoleListApi } from '#/api/system';

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'roleName',
      label: '角色名称',
      rules: 'required',
      componentProps: {
        placeholder: '请输入',
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
      component: 'Input',
      fieldName: 'remark',
      label: '备注',
      componentProps: {
        placeholder: '请输入',
        maxlength: 200,
        showWordLimit: true,
      },
    },
    {
      component: 'ApiTreeSelect',
      fieldName: 'menuIds',
      label: '授权',
      componentProps: {
        api: getAllMenusApi,
        childrenField: 'children',
        labelField: 'name',
        valueField: 'path',
        multiple: true,
        showCheckbox: true,
        placeholder: '请选择',
        checkStrictly: false,
        defaultExpandAll: true,
      },
    },
  ],
  showDefaultActions: false,
});

const [RoleDrawer, drawerApi] = useVbenDrawer({
  onConfirm: async () => {
    await formApi.validate();
    ElMessage.success('Saved successfully');
    drawerApi.close();
  },
  onOpenChange: (isOpen) => {
    if (isOpen) {
      const { isUpdate, values } = drawerApi.getData() || {};
      if (isUpdate) {
        formApi.setValues(values);
      } else {
        formApi.resetForm();
      }
    }
  },
});

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        component: 'Input',
        fieldName: 'roleName',
        label: '角色名称',
        componentProps: {
          placeholder: '请输入',
        },
      },
      {
        component: 'Input',
        fieldName: 'roleId',
        label: '角色ID',
        componentProps: {
          placeholder: '请输入',
        },
      },
      {
        component: 'Select',
        fieldName: 'status',
        label: '状态',
        componentProps: {
          placeholder: '请选择',
          options: [
            { label: '已启用', value: '1' },
            { label: '已禁用', value: '0' },
          ],
        },
      },
      {
        component: 'Input',
        fieldName: 'remark',
        label: '备注',
        componentProps: {
          placeholder: '请输入',
        },
      },
      {
        component: 'DatePicker',
        fieldName: 'createTime',
        label: '创建时间',
        componentProps: {
          type: 'datetimerange',
          rangeSeparator: '-',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          shortcuts: [
            {
              text: '最近一周',
              value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              },
            },
            {
              text: '最近一个月',
              value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              },
            },
            {
              text: '最近三个月',
              value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              },
            },
          ],
        },
      },
    ],
    // 3列布局
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3',
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
  gridOptions: {
    columns: [
      { field: 'roleName', title: '角色名称', minWidth: 100 },
      {
        field: 'id',
        title: '角色ID',
        minWidth: 200,
        formatter: ({ cellValue }) => {
          if (cellValue && cellValue.length > 20) {
            return `${cellValue.slice(0, 20)}...`;
          }
          return cellValue;
        },
      },
      {
        field: 'status',
        title: '状态',
        slots: { default: 'status' },
        width: 150,
      },
      { field: 'remark', title: '备注', minWidth: 200, showOverflow: true },
      { field: 'createTime', title: '创建时间', width: 180 },
      {
        title: '操作',
        slots: { default: 'action' },
        width: 150,
        fixed: 'right',
      },
    ],
    proxyConfig: {
      ajax: {
        query: async ({ page, form }) => {
          return await getRoleListApi({
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
  drawerApi.setState({ title: '新增' });
  drawerApi.open();
}

function handleEdit(row: any) {
  drawerApi.setData({ isUpdate: true, values: row });
  drawerApi.setState({ title: '修改' });
  drawerApi.open();
}

function handleDelete(row: any) {
  ElMessage.success(`删除角色: ${row.roleName}`);
}
</script>

<template>
  <Page title="角色管理" :auto-content-height="true">
    <Grid>
      <template #toolbar-tools>
        <ElButton type="primary" @click="handleAdd">
          <span class="icon-[lucide--plus] mr-1"></span>
          新增角色
        </ElButton>
      </template>
      <template #status="{ row }">
        <div class="flex items-center gap-2">
          <ElTag
            :type="row.status === '1' ? 'primary' : 'info'"
            effect="dark"
            class="rounded-full px-3"
            :style="{
              backgroundColor: row.status === '1' ? '#409eff' : '#909399',
              borderColor: row.status === '1' ? '#409eff' : '#909399',
            }"
          >
            {{ row.status === '1' ? '已启用' : '已禁用' }}
          </ElTag>
          <ElSwitch
            v-model="row.status"
            active-value="1"
            inactive-value="0"
            size="small"
            @click.stop
          />
        </div>
      </template>
      <template #action="{ row }">
        <ElButton link type="primary" @click="handleEdit(row)">修改</ElButton>
        <ElButton link type="danger" @click="handleDelete(row)">删除</ElButton>
      </template>
    </Grid>
    <RoleDrawer title="新增">
      <Form />
    </RoleDrawer>
  </Page>
</template>
