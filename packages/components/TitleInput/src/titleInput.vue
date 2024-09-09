<template>
  <div class="title-input">
    <div class="title">
      <slot name="title">
        title
      </slot>
    </div>
    <div class="input">
      <input type="text" :value="props.value" @input="$emit('update:value', $event.target.value)">
    </div>
  </div>
</template>
<script setup lang="ts">
  defineOptions({
    name: 'TitleInput',
  })
  const props = defineProps({
    value: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'title',
    }
  })
  const emit = defineEmits(['update:value'])
</script>
<style scoped>

</style>