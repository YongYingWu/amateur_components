import { definePropType } from "element-plus/es/utils/index.mjs"

export const CodeEditorProps = {
  // 代码类型
  lang: {
    type: String,
    default: 'sql',
  },
  // 关键字补全
  provideLang: {
    type: Array,
    default:[],
  },
  // 自定义关键字
  fieldsArr: {
    type: definePropType<({type: string, value: string})[]>(Array),
    default: () => [],
  },
  // v-model代码内容
  modelValue: {
    type: String,
    default: '',
  },
}

export const CodeEditorEmits = {
  'update:modelValue': (value: string): void => {},
}

// 引入内置支持的关键字url
export const importURL = {
  'sql': 'monaco-editor/esm/vs/basic-languages/sql/sql.js',
  'java': 'monaco-editor/esm/vs/basic-languages/java/java.js',
}

export default {
  importURL,
  CodeEditorProps,
  CodeEditorEmits,
}