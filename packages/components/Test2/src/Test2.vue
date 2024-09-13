<template>
  comp
</template>

<script lang="ts" setup>
import { Test2Props, Test2Emits } from './Test2';
defineOptions({
  name: 'Test2',
  inheritAttrs: false,
})
defineProps(Test2Props)
defineEmits(Test2Emits)
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
