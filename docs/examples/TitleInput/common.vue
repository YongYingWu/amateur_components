<template>
  <TitleInput v-model="title" tagType="el-input" title="标题" style="width: 240px" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const title = ref('')
</script>