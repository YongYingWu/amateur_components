export const CodeEditorProps = {}

export const CodeEditorEmits = []

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