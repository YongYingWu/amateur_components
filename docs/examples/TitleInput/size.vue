<template>
  <div class="h-flex flex-wrap" style="gap: 8px;">
    <TitleInput
      v-model="title"
      tagType="el-input"
      title="标题"
      style="width: 240px"
      size="small" />
    <TitleInput
      v-model="title"
      tagType="el-input"
      title="标题"
      style="width: 240px"
      size="default" />
    <TitleInput
      v-model="title"
      tagType="el-input"
      title="标题"
      style="width: 240px"
      size="large" />
  </div>
</template>
<script lang="ts" setup>
import TitleInput from '../../../packages/components/TitleInput'
import { ref } from 'vue'
const title = ref('')
</script>