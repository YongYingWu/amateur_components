<template>
  comp
</template>

<script lang="ts" setup>
import { templateProps, templateEmits } from './template';
defineOptions({
  name: 'template',
  inheritAttrs: false,
})
defineProps(templateProps)
defineEmits(templateEmits)
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
