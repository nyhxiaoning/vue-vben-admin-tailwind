<script lang="ts" setup>
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElMessage, ElTag } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getDeptListApi } from '#/api/system';

const [DeptDrawer, drawerApi] = useVbenDrawer({
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
  schema: [
    {
      component: 'Input',
      fieldName: 'deptName',
      label: '部门名称',
      rules: 'required',
      componentProps: { placeholder: '请输入' },
    },
    {
      component: 'TreeSelect',
      fieldName: 'parentId',
      label: '上级部门',
      componentProps: {
        placeholder: '请选择',
        data: [], // Populate with dept tree
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
  ],
  showDefaultActions: false,
});

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        component: 'Input',
        fieldName: 'deptName',
        label: '部门名称',
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
      { field: 'deptName', title: '部门名称', treeNode: true, width: 250 },
      {
        field: 'status',
        title: '状态',
        slots: { default: 'status' },
        width: 100,
      },
      { field: 'createTime', title: '创建时间', width: 200 },
      { field: 'remark', title: '备注', minWidth: 300, showOverflow: true },
      {
        title: '操作',
        slots: { default: 'action' },
        width: 200,
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
          return await getDeptListApi({
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
  drawerApi.setState({ title: '新增部门' });
}

function handleEdit(row: any) {
  drawerApi.setData({ isUpdate: true, values: row });
  drawerApi.open();
  drawerApi.setState({ title: '修改部门' });
}

function handleDelete(row: any) {
  ElMessage.success(`删除部门: ${row.deptName}`);
}

function handleAddChild(row: any) {
  drawerApi.setData({ isUpdate: false, values: { parentId: row.id } });
  drawerApi.open();
  drawerApi.setState({ title: '新增下级部门' });
}
</script>

<template>
  <Page title="部门管理" :auto-content-height="true">
    <template #extra>
      <ElButton type="primary" @click="handleAdd">
        <span class="icon-[lucide--plus] mr-1"></span>
        新增部门
      </ElButton>
    </template>
    <Grid>
      <template #status="{ row }">
        <ElTag
          :type="row.status === '1' ? 'success' : 'danger'"
          effect="light"
          round
        >
          {{ row.status === '1' ? '已启用' : '已禁用' }}
        </ElTag>
      </template>
      <template #action="{ row }">
        <ElButton link type="primary" @click="handleAddChild(row)">
          新增下级
        </ElButton>
        <ElButton link type="primary" @click="handleEdit(row)">修改</ElButton>
        <ElButton link type="danger" @click="handleDelete(row)">
          删除
        </ElButton>
      </template>
    </Grid>
    <DeptDrawer title="新增部门" class="w-[600px]">
      <Form />
    </DeptDrawer>
  </Page>
</template>
