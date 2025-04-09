import type { PropType } from 'vue'
// export interface Option {
//   label: string,
//   value: string | number,
//   default?: boolean | unknown
// }

export const FilterButtonProps = {
  // 筛选数据源（v-model:options/:options）
  options: {
    type: Array as PropType<object[]>,
    default: () => [],
    required: true,
  },
  // 选中数据的值
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    required: true,
    default: () => [],
  },

  // 选项是否可拖拽，配合v-model:options使用
  draggable: {
    type: Boolean,
    default: false,
  },

 // 一次选一个关闭弹窗还是可以多个选中关闭弹窗
  once: {
    type: Boolean,
    default: true,
  },

  // 是否可以清除已选项
  clearable: {
    type: Boolean,
    default: true,
  },

  // label字段名称
  labelKey: {
    type: String,
    default: 'label',
  },

  // value字段名称
  valueKey: {
    type: String,
    default: 'value',
  },
}

export const FilterButtonEmits = {
  change: (value: object): void => {},
  clear: (): void => {},
  sort: (value: object):void => {},
  search: (value: string): void => {},
  'update:modelValue': (value: (string | number)[]): void => {},
}

export type FilterButtonEmits = typeof FilterButtonEmits
export type FilterButtonProps = typeof FilterButtonProps

export default {
  FilterButtonProps,
  FilterButtonEmits,
}