<template>
  <FilterButton v-model="checked" :options="options" @change="change" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const options = ref([
  {
    label: '文件',
    value: 'file',
    default: true
  },
  {
    label: '文件夹',
    value: 'folder',
    default: true,
  },
  {
    label: '链接',
    value: 'link'
  },
  {
    label: '图片',
    value: 'image'
  },
  {
    label: '视频',
    value: 'video'
  },
  {
    label: '编辑',
    value: 'edit'
  },
  {
    label: '删除',
    value: 'delete'
  },
  {
    label: '重命名',
    value: 'rename'
  },
  {
    label: '复制',
    value: 'copy'
  },
  {
    label: '移动',
    value: 'move'
  },
  {
    label: '分享',
    value: 'share'
  },
  {
    label: '下载',
    value: 'download'
  },
])
const checked = ref(null)
function change(e) {
  console.log('change', e)
}
</script>