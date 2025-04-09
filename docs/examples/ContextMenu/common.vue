<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="id" width="100"/>
    <el-table-column label="操作">
      <template #default="{ row }">
        <ContextMenu :default="2">
          <el-button type="primary" link size="small" @click="row.id++">增加a</el-button>
          <el-button v-if="row.id >= 1" link size="small" type="primary" @click="row.id--">减少a</el-button>
          <el-button type="primary" link size="small" @click="row.id++">增加b</el-button>
          <el-button v-show="row.id >= 1" link size="small" type="primary" @click="row.id--">减少a</el-button>
          <el-button type="primary" link size="small" @click="row.id--">减少b</el-button>
        </ContextMenu>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
const tableData = [{id: 0}]
</script>