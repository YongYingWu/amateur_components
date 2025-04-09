<template>
  comp
</template>

<script lang="ts" setup>
import { PaginationSelectProps, PaginationSelectEmits } from './PaginationSelect';
defineOptions({
  name: 'PaginationSelect',
  inheritAttrs: false,
})
defineProps(PaginationSelectProps)
defineEmits(PaginationSelectEmits)
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
