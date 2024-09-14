<template>
  <div class="h-flex flex-wrap" style="gap: 8px;">
    <TitleInput v-model="title" tagType="el-select" title="下拉框" style="width: 240px" active-outline>
      <el-option label="选项一" value="1"></el-option>
      <el-option label="选项二" value="2"></el-option>
      <el-option label="选项三" value="3"></el-option>
    </TitleInput>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const title = ref('')
</script>