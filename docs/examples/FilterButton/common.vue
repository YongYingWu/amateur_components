<template>
  <FilterButton v-model="checked" :options="options" @change="change" />
  <el-button style="float: right" @click="addOptions">add</el-button>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const options = ref([
  {
    label: '文件1',
    value: 'file',
    default: true
  },
  {
    label: '文件夹1',
    value: 'folder',
    default: true,
  },
  {
    label: '链接1',
    value: 'link'
  },
  {
    label: '图片1',
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
    label: '下载1',
    value: 'download'
  },
])
function addOptions() {
  options.value.push({
    label: '新增' + options.value.length,
    value: Math.random().toString(36).slice(-8)
  })
}

watch(options.value, (newVal) => {
  console.log('options', newVal)
}, { deep: true })

const checked = ref(null)
function change(e) {
  console.log('change', e)
}
</script>