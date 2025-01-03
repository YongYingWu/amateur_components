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
              <span>已选{{ checked.length ?? 0 }}项</span>
              <el-link :underline="false" :disabled="!clearable" type="primary" @click="clearChecked">清除已选</el-link>
            </div>
            <el-checkbox-group v-model="checked">
              <template v-for="(item, i) in options" :key="item.value">
                <el-checkbox
                  v-show="checked.includes(item.value) && item.label.includes(searchText)"
                  class="option"
                  :disabled="item.default"
                  :label="item.label"
                  :value="item.value"
                  @change="change(item, $event)">
                  <slot name="option" :item="item" :index="i">
                    {{ item.label }}
                  </slot>
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
          <div class="check-box">
            <div class="check-box-title">
              <span>所有字段</span>
              <el-link
                :underline="false"
                :disabled="checked.length === props.options.length"
                type="primary"
                @click="checkAll">
                全选
              </el-link>
            </div>
            <el-checkbox-group v-model="checked">
              <template v-for="(item, i) in props.options" :key="item.value">
                <el-checkbox
                  v-show="!checked.includes(item.value) && item.label.includes(searchText)"
                  class="option"
                  :label="item.label"
                  :value="item.value"
                  @change="change(item, $event)">
                  <slot name="option" :item="item" :index="i">
                    {{ item.label }}
                  </slot>
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
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
import { computed, onMounted, ref } from 'vue';
import { FilterButtonProps, FilterButtonEmits } from './FilterButton';
defineOptions({
  name: 'FilterButton',
  inheritAttrs: false,
})
const props = defineProps(FilterButtonProps)
const emit = defineEmits(FilterButtonEmits)
const visible = ref<boolean>(true)
const searchText = ref<string>('')
const clearable = computed<boolean>(() => {
  return checked.value.length > 0 && !checked.value.every(_ => props.options.find(item => item.value === _)?.default)
})

const checked = computed({
  get() {
    return props.modelValue ?? []
  },
  set(value : any) {
    emit('update:modelValue', value)
  }
})

onMounted(() => {
  checked.value = props.options.filter(_ => _.default).map(_ => _.value)
})

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

function clearChecked() {
  checked.value = checked.value.filter(_ => props.options.find(item => item.value === _)?.default)
}
function checkAll() {
  checked.value = props.options.map(_ => _.value)
}
function handleClickBtn() {
  visible.value = true
  console.log(visible.value)
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

.top-line {
  border-top: 1px solid rgba($line-color, 0.4);
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
