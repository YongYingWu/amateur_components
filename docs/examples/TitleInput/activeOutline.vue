<!--
@name: wyy
@desc: 测试标题输入框
-->
<template>
  <TitleInput
    v-model="title"
    tagType="el-input"
    title="标题"
    :active-outline="true"
    style="width: 240px" />
</template>
<script lang="ts" setup>
import TitleInput from '../../../packages/components/TitleInput'
import { ref } from 'vue'
const title = ref('')
</script>