<template>
  <div class="title-input">
    <div class="title">
      <slot name="title">
        title
      </slot>
    </div>
    <div class="input">
      <input type="text" :value="value" @input="$emit('update:value', $event.target.value)">
    </div>
  </div>
</template>
<script setup lang="ts">
  
</script>
<style scoped>

</style>