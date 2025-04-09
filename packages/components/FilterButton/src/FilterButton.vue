<template>
  <div class="filter-button-box">
    <el-popover
      ref="popover"
      trigger="click"
      width="250px"
      placement="bottom"
      popper-style="padding: 0">
      <template #default>
        <div class="search-box btm-line">
          <el-input v-model="searchText" placeholder="筛选字段" prefix-icon="Search" @change="search" />
        </div>
        <div class="content-box">
          <!-- 已选 -->
          <div class="btm-line check-box">
            <div class="check-box-title">
              <span>已选{{ modelValue.length ?? 0 }}项</span>
              <el-link :underline="false" :disabled="!clearable" type="primary" @click="clearChecked">清除已选</el-link>
            </div>
            <el-checkbox-group v-model="modelValue">
              <VueDraggable
                :disabled="!draggable"
                v-model="modelValue"
                @sort="sort">
                <template v-for="(item, i) in checkedOption" :key="item[valueKey]">
                  <el-checkbox
                    v-show="item[labelKey].toLowerCase().includes(searchText.toLowerCase())"
                    class="option"
                    :class="{ draggable }"
                    :disabled="item.default"
                    :label="item[labelKey]"
                    :value="item[valueKey]"
                    @change="change(item, $event)">
                    <slot name="option" :item="item" :index="i">
                      {{ item[labelKey] }}
                    </slot>
                  </el-checkbox>
                </template>
              </VueDraggable>
            </el-checkbox-group>
          </div>
          <!-- 未选 -->
          <div class="check-box">
            <div class="check-box-title">
              <span>所有字段</span>
              <el-link
                :underline="false"
                :disabled="modelValue.length === options.length"
                type="primary"
                @click="checkAll">
                全选
              </el-link>
            </div>
            <el-checkbox-group v-model="modelValue">
              <template v-for="(item, i) in options" :key="item[valueKey]">
                <el-checkbox
                  v-show="!modelValue.includes(item.value) &&
                    item[labelKey].toLowerCase().includes(searchText.toLowerCase())"
                  class="option"
                  :disabled="item.default"
                  :label="item[labelKey]"
                  :value="item[valueKey]"
                  @change="change(item, $event)">
                  <slot name="option" :item="item" :index="i">
                    {{ item[labelKey] }}
                  </slot>
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </div>
      </template>
      <template #reference>
        <slot name="trigger">
          <el-button size="small"> 筛选 </el-button>
        </slot>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { FilterButtonProps, FilterButtonEmits } from './FilterButton';
import { VueDraggable  } from 'vue-draggable-plus'
defineOptions({
  name: 'FilterButton',
  inheritAttrs: false,
})
const props = defineProps(FilterButtonProps)
const emit = defineEmits(FilterButtonEmits)
const searchText = ref<string>('')
const clearable = computed<boolean>(() => {
  return modelValue.value.length > 0 && !modelValue.value.every(_ => options.value.find(item => item.value === _)?.default)
})
const { draggable, labelKey, valueKey } = props
// 用户不穿modelValue时，内部维护一个modelValue
const _modelValue = ref<any[]>([])
const modelValue = computed({
  get() {
    return props.modelValue ?? _modelValue.value
  },
  set(value : any) {
    _modelValue.value = value
    emit('update:modelValue', value)
  }
})
const options = computed(() => props.options)
const checkedOption = computed(() => {
  return modelValue.value.map((_:any) => options.value.find((option:any) => option[valueKey] === _))
})
const unCheckOption = computed(() => {
  return options.value.filter(_ => !modelValue.value.includes(_[valueKey]))
})
const popover = ref(null)

watch(options, (newOptions) => {
  modelValue.value = modelValue.value.filter(value =>
    newOptions.some(opt => opt[valueKey] === value)
  )
})

onMounted(() => {
  modelValue.value = [...new Set([
    ...modelValue.value,
    ...options.value.filter(_ => _.default).map(_ =>  _[valueKey])
    ])
  ]
})
function sort(e) {
  emit('sort', e)
  change(e)
}
function change(option?: any, e?: any) {
  console.log('changeItem')
  emit('change', {
    value: modelValue.value,
    checkedOptions: checkedOption.value,
    option,
    isChecked: e
  })
  if ((e ?? false) && props.once) {
    popover.value?.hide()
  }
}
function search() {
  emit('search', searchText.value)
}

function clearChecked() {
  modelValue.value =
    modelValue.value.filter(_ =>
    options.value.find(item => item[valueKey] === _)?.default)
  emit('clear')
  change()
}
function checkAll() {
  modelValue.value.push(...unCheckOption.value.map(_ => _[valueKey]))
  change()
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

    &.draggable::after {
      content: ':::';
      transform: rotateZ(90deg);
      text-align: center;
      display: block;
      float: right;
    }
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
