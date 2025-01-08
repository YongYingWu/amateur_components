<template>
<div>
    <div ref="container" style="height: 100%;width: 100%;"></div>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import { format } from 'sql-formatter';
import { CodeEditorProps, CodeEditorEmits } from './CodeEditor.ts';
import { language as sqlLang } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
import { language as javaLang } from 'monaco-editor/esm/vs/basic-languages/java/java.js';
import { language as mysqlLang } from 'monaco-editor/esm/vs/basic-languages/mysql/mysql.js';
import { language as shellLang } from 'monaco-editor/esm/vs/basic-languages/shell/shell.js';
// 解决控制台告警
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
self.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    if (label === 'html') {
      return new htmlWorker();
    }
    return new editorWorker();
  }
};

const languages = {
    sql: sqlLang,
    java: javaLang,
    mysql: mysqlLang,
    shell: shellLang
}
const { provideLang, lang, fieldsArr, modelValue } = defineProps(CodeEditorProps)
const emit = defineEmits(CodeEditorEmits)

const container = ref(null);
onMounted(() => {
    initEditor()
})

function initEditor() {
    // editor不能使用响应式，数据过大卡死
    const editor = monaco.editor.create(container.value, {
        theme: 'vs-light', // 主题
        language: lang,
        value: modelValue,
        renderLineHighlight: 'gutter',
        folding: true, // 是否折叠
        // roundedSelection: false,
        // foldingHighlight: true, // 折叠等高线
        // foldingStrategy: 'indentation', // 折叠方式  auto | indentation
        // showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
        // disableLayerHinting: true, // 等宽优化
        // emptySelectionClipboard: false, // 空选择剪切板
        // selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        codeLens: true, // 代码镜头
        // scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true // 颜色装饰器
        // accessibilitySupport: 'on', // 辅助功能支持  "auto" | "off" | "on"
        // lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
        // lineNumbersMinChars: 5, // 行号最小字符   number
        // enableSplitViewResizing: false,
        // readOnly: false //是否只读  取值 true | false
    });

    // 注册自动完成提供程序
    monaco.languages.registerCompletionItemProvider(lang,{
        provideCompletionItems:(model, position) => {
            let oriprivode = [
                ...fieldsArr
            ]
            provideLang.forEach(_ => {
                if (languages[_]) {
                    oriprivode.push(...languages[_].keywords.map(item => ({type: 'Keyword',value: item, provideLang: _})))
                }
            })
            const suggestions = []
            // language.keywords 是获取内置的SQL关键字
            oriprivode.map(item => {
                suggestions.push({
                    label: item.value,
                    kind: monaco.languages.CompletionItemKind[item.type],
                    insertText: item.value + ' ',
                    detail: item.type == 'Keyword' ? `${item.provideLang}关键字` : '表字段',
                })
            })
            return {
                suggestions
            };
        }
    })

    // 右键菜单
    editor.addAction({
        id: 'format.sql',
        label: 'Formart SQL',
        precondition: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1,
        run: function () {
            // sql代码格式化
            console.log(format(editor.getValue()))
            editor.setValue(format(editor.getValue()));
        }
    });

    // 监听代码变化
    editor.onDidChangeModelContent((event) => {
        // value.value = editor.getValue();
        console.log(event)
        console.log(editor.getValue)
        emit('update:modelValue', editor.getValue())

    });
}

</script>