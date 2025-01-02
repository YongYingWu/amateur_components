<template>
  <div class="filter-button-box">
    <el-popover
      :visible="visible"
      width="250px"
      placement="bottom"
      popper-style="padding: 0">
      <template #default>
        <div class="search-box btm-line">
          <el-input v-model="searchText" placeholder="筛选字段" prefix-icon="Search" @change="search" />
        </div>
        <div class="content-box">
          <div class="btm-line check-box">
            <div class="check-box-title">
              <span>已选1项</span><el-link :underline="false" :disabled="!clearable" type="primary">清除已选</el-link>
            </div>
            <el-checkbox-group v-model="checked">
              <template v-for="item in options" :key="item.value">
                <el-checkbox
                  v-show="checked.includes(item.value)"
                  class="option"
                  :label="item.label"
                  :value="item.value"
                  @change="change(item, $event)">
                  {{ item.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
          <div class="btm-line check-box">
            <div class="check-box-title">
              <span>所有字段</span>
            </div>
            <el-checkbox-group v-model="checked">
              <template v-for="item in options" :key="item.value">
                <el-checkbox
                  v-show="!checked.includes(item.value)"
                  class="option"
                  :label="item.label"
                  :value="item.value"
                  @change="change(item, $event)">
                  {{ item.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </div>
        <div class="btm-btn check-box check-box-title">
          <el-link :underline="false" @click="cancel">取消</el-link>
          <el-link :underline="false" type="primary" @click="confirm">确认</el-link>
        </div>
      </template>
      <template #reference>
        <div @click="handleClickBtn">
          <slot name="trigger">
            <el-button size="small"> 筛选 </el-button>
          </slot>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { FilterButtonProps, FilterButtonEmits } from './FilterButton';
defineOptions({
  name: 'FilterButton',
  inheritAttrs: false,
})
defineProps(FilterButtonProps)
const emit = defineEmits(FilterButtonEmits)

const visible: Ref<boolean> = ref(true)
const clearable: Ref<boolean> = ref(true)
const searchText: Ref<string> = ref('')
const checked: Ref<string[]> = ref([])
const options: Ref<{label: string, value: string}[]> = ref([{
  label: '文件',
  value: 'file'
}, {
  label: '文件夹',
  value: 'folder'
}, {
  label: '链接',
  value: 'link'
}, {
  label: '图片',
  value: 'image'
}, {
  label: '视频',
  value: 'video'
}, {
  label: '编辑',
  value: 'edit'
}, {
  label: '删除',
  value: 'delete'
}, {
  label: '重命名',
  value: 'rename'
}, {
  label: '复制',
  value: 'copy'
}, {
  label: '移动',
  value: 'move'
}, {
  label: '分享',
  value: 'share'
}, {
  label: '下载',
  value: 'download'
},])

function change(item: any, e?: any) {
  console.log(item, e)
  emit('change', {
    value: checked.value,
    item,
    checked: e
  })
}
function search() {
  console.log(searchText.value)
}
function handleClickBtn() {
  visible.value = true
  console.log(visible.value)
}

function confirm() {
  visible.value = false
  const checkedDetail = options.value.filter(_ => checked.value.includes(_.value))
  emit('confirm', {
    checked: checked.value,
    checkedDetail
  })
}

function cancel() {
  visible.value = false
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.filter-button-box {
  width: fit-content;
}

.btm-line {
  border-bottom: 1px solid rgba($line-color, 0.4);
}

.search-box {
  :deep(.el-input__wrapper) {
    box-shadow: none;
  }
}

.content-box {
  overflow: auto;
  max-height: 320px;
}

.check-box {
  font-size: 12px;
  padding: 0 16px;
  color: #697d8c;
  :deep(.el-link) {
    font-size: 12px;
    margin-left: 2px;
  }

  .option {
    display: block;
    height: 36px;
    line-height: 36px;
    padding: 0;
    margin: 0;
  }
}

.check-box-title {
  height: 36px;
  line-height: 36px;
}

.btm-btn {
  display: flex;
  justify-content: flex-end;
  gap: $gap-m;
}

</style>
