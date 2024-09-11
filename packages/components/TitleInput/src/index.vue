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

<script setup>
defineOptions({
  name: 'KitTitleInput',
  inheritAttrs: false,
})

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: function () {
      return {}
    },
  },
  // 渲染标签
  tagType: {
    type: [String, Boolean, Object],
    required: true,
  },

  // 控件尺寸
  size: {
    type: String,
    default: '',
    required: false,
  },

  // 标题文本
  title: {
    type: String,
    default: '',
    required: false,
  },

  // suffix 尾部文本
  suffix: {
    type: String,
    default: '',
    required: false,
  },

  // title class名称
  titleClassName: {
    type: String,
    default: '',
  },

  // title自定义样式
  titleStyle: {
    type: Object,
    default() {
      return {}
    },
  },

  // suffix自定义样式
  suffixStyle: {
    type: Object,
    default() {
      return {}
    },
  },

  // 是否开启清理按钮
  clearable: {
    type: Boolean,
    default: true,
  },

  // 是否溢出隐藏
  isHidden: {
    type: Boolean,
    default: false,
  },

  // 是否开启选择激活边框
  activeOutline: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
