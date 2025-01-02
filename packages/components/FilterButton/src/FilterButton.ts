export const FilterButtonProps = {
  // 筛选数据源
  filters: {
    type: Array,
    default: () => [],
  },
}

export const FilterButtonEmits = {
  confirm: (value: object): void => {},
  cancel: (value: object): void => {},
  change: (value: object): void => {}
}

export type FilterButtonEmits = typeof FilterButtonEmits

export default {
  FilterButtonProps,
  FilterButtonEmits,
}