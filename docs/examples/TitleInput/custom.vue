<template>
  <div class="h-flex flex-wrap" style="gap: 8px;">
    <TitleInput v-model="title" tagType="el-input" title="标题" style="width: 240px" active-outline>
      <template #custom>
        <el-button type="primary" link icon="Search"></el-button>
      </template>
    </TitleInput>
    <TitleInput style="width: 240px" active-outline>
      <template #custom>
        <el-input v-model="title"></el-input>
        <el-button type="primary" link icon="Search"></el-button>
      </template>
    </TitleInput>
    <TitleInput style="width: 240px" active-outline>
      <template #custom>
        <div
          style="display: flex;
          align-items: center;
          justify-content: center;
          width: 5rem;
          text-align: center;">
          【标题】
        </div>
        <el-input v-model="title"></el-input>
      </template>
    </TitleInput>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const title = ref('')
</script>