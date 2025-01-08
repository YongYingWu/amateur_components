<template>
  <pre>{{ value }} </pre>
  <CodeEditor
    v-model="value"
    :provideLang
    :lang
    :fieldsArr
    style="width: 100%; height: 200px;border: 1px solid #ccc;"/>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('SELECT * from user where name IN (SELECT name FROM custom)')
const provideLang = ref(['sql', 'java'])
const lang = ref('sql')
// 这个是自定义的表字段数据
const fieldsArr = ref([
    {
        type: 'Field', // 这个类型是为了区分是关键字还是字段，具体可以看下文档
        value: 'name'
    },
    {
        type: 'Field',
        value: 'age'
    },
    {
        type: 'Field',
        value: 'sex'
    }
])
</script>