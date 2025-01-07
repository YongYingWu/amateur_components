import { definePropType } from "element-plus/es/utils/index.mjs"

export interface Option {
  label: string,
  value: string | number,
  default?: boolean | unknown
}

export const FilterButtonProps = {
  // 筛选数据源（v-model:options/:options）
  options: {
    type: definePropType<Option[]>(Array),
    default: () => [],
    required: true,
  },
  // 选中数据的值
  modelValue: {
    type: [Array],
    default: null,
  },

  // 选项是否可拖拽，配合v-model:options使用
  draggable: {
    type: Boolean,
    default: false,
  }
}

export const FilterButtonEmits = {
  confirm: (value: object): void => {},
  cancel: (): void => {},
  change: (value: object): void => {},
  sort: (value: object):void => {},
  'update:modelValue': (value: (string | number)[]): void => {},
  'update:options': (value: (string | number)[]): void => {},
}

export type FilterButtonEmits = typeof FilterButtonEmits
export type FilterButtonProps = typeof FilterButtonProps

export default {
  FilterButtonProps,
  FilterButtonEmits,
}