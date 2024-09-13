export const titleInputProps = {
  test: {
    type: [String, Boolean],
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: function () {
      return {}
    },
  },
  // 渲染标签
  tagType: {
    type: [String, Boolean, Object],
    required: true,
  },

  // 控件尺寸
  size: {
    type: String,
    default: '',
    required: false,
  },

  // 标题文本
  title: {
    type: String,
    default: '',
    required: false,
  },

  // suffix 尾部文本
  suffix: {
    type: String,
    default: '',
    required: false,
  },

  // title class名称
  titleClassName: {
    type: String,
    default: '',
  },

  // title自定义样式
  titleStyle: {
    type: Object,
    default() {
      return {}
    },
  },

  // suffix自定义样式
  suffixStyle: {
    type: Object,
    default() {
      return {}
    },
  },

  // 是否开启清理按钮
  clearable: {
    type: Boolean,
    default: true,
  },

  // 是否溢出隐藏
  isHidden: {
    type: Boolean,
    default: false,
  },

  // 是否开启选择激活边框
  activeOutline: {
    type: Boolean,
    default: false,
    required: false,
  },
}

export const titleInputEmits = [
  // 清除按钮点击事件
  'clear',
  'click',
  'change',
  'focus',
  'blur',
  'keydown',
  'keyup',
]

export default {
  titleInputProps,
  titleInputEmits,
}