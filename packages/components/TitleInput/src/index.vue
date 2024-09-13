<template>
  <div class="input-title-box h-flex" :class="[{ activeOutline: activeOutline }, props.class]" :style="props.style">
    <div v-if="title" class="title" :class="titleClassName" :style="titleStyle">
      {{ title }}
    </div>
    <component
      :is="tagType"
      v-if="tagType"
      :size="size"
      :clearable="clearable"
      class="comp-inner flex-1"
      :class="{ 'hidden-more': isHidden }"
      v-bind="$attrs">
      <template v-for="(slot, key) in $slots" #[key]="scope">
        <slot :name="key" v-bind="scope" />
      </template>
    </component>
    <div v-if="suffix" class="suffix" :style="suffixStyle">
      {{ suffix }}
    </div>
    <slot name="custom" />
  </div>
</template>

<script lang="ts" setup>
import { titleInputProps } from './TitleInput';
defineOptions({
  name: 'KitTitleInput',
  inheritAttrs: false,
})
const props = defineProps(titleInputProps)
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
