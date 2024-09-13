<template>
  comp
</template>

<script lang="ts" setup>
import { TestProps, TestEmits } from './Test';
defineOptions({
  name: 'Test',
  inheritAttrs: false,
})
defineProps(TestProps)
defineEmits(TestEmits)
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
