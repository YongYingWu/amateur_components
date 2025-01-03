import { definePropType } from "element-plus/es/utils/index.mjs"

export interface Option {
  label: string,
  value: string | number,
  default?: boolean | unknown
}

export const FilterButtonProps = {
  // 筛选数据源
  options: {
    type: definePropType<Option[]>(Array),
    default: () => [],
  },
  // 选中数据的值
  modelValue: {
    type: [Array],
    default: () => [],
  },
}

export const FilterButtonEmits = {
  confirm: (value: object): void => {},
  cancel: (): void => {},
  change: (value: object): void => {},
  'update:modelValue': (value: (string | number)[]): void => {},
}

export type FilterButtonEmits = typeof FilterButtonEmits
export type FilterButtonProps = typeof FilterButtonProps

export default {
  FilterButtonProps,
  FilterButtonEmits,
}