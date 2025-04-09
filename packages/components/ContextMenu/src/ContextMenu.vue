<template>
  <div class="context-menu">
    <div ref="contextMenu" class="context-menu-item">
      <template v-for="i in beforeIndex" :key="i">
        <mySlot :vnode="defaultSlot[i]" />
      </template>
      <template v-if="foldIndex.length">
        <el-button ref="dropdown" type="text" class="submenu">
          <el-dropdown :hide-on-click="false" trigger="hover">
            <span class="el-dropdown-link">
              <el-icon><More /></el-icon>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu :hide-on-click="false"  :popper-append-to-body="false">
                <el-dropdown-item v-for="i in foldIndex" :key="i" class="context-menu-item-li-2025">
                  <mySlot :vnode="defaultSlot[i]" />
                </el-dropdown-item>
              </el-dropdown-menu>
              </template>
          </el-dropdown>
        </el-button>
      </template>
      <div class="tmpNodes" v-show="false" ref="tmpNodes">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ContextMenuProps, ContextMenuEmits } from './ContextMenu';
import { onMounted, onUpdated, ref, useSlots } from 'vue'
import createSlots from './createSlots'
defineOptions({
  name: 'ContextMenu',
  inheritAttrs: false,
})
const props = defineProps(ContextMenuProps)
defineEmits(ContextMenuEmits)
const beforeIndex = ref<number[]>([])
const foldIndex = ref<number[]>([])
const dropdown = ref(null)
const contextMenu = ref(null)
const tmpNodes = ref<HTMLElement | null>(null)
const $slots = useSlots()
const defaultSlot = ref<any[]>([])
const mySlot = createSlots()
onUpdated(() => {
  getNodes()
})
onMounted(() => {
  getNodes()
})
// 获取展示节点
function getNodes() {
  const defaultSlots : any[] = $slots.default ? $slots.default() : []
  if (!tmpNodes.value) return
  const tmpNodesChild = Array.from(tmpNodes.value.childNodes)
  if (tmpNodesChild.length <= 2) return
  const before : any[] = []
  const beforePos: any[] = []
  const fold : any[] = []
  const foldPos :any[] = []
  tmpNodesChild.slice(1, tmpNodesChild.length - 1).forEach((vnode: HTMLElement, i : number) => {
    if (!(vnode instanceof Comment) && vnode.style.display !== 'none' && vnode.parentNode) {
      if (before.length < props.default) {
        before.push(defaultSlots[i])
        beforePos.push(i)
      } else {
        fold.push(defaultSlots[i])
        foldPos.push(i)
      }
    }
  })
  if (beforeIndex.value.length !== beforePos.length ||
    foldIndex.value.length !== foldPos.length ||
    beforeIndex.value.some(_ => !beforePos.includes(_)) ||
    foldIndex.value.some(_ => !foldPos.includes(_))) {
    beforeIndex.value = beforePos
    foldIndex.value = foldPos
    defaultSlot.value = defaultSlots
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.context-menu-item {
  padding-left: 0;
  list-style: none;
  font-size: 14px;
  display: inline-block;
  overflow: auto;
  margin: 0.5px;

  li {
    float: left;
    padding: 4.5px 4px;
    cursor: pointer;
    color: #409eff;
    font-size: 12px;

    a {
      display: block;
      text-decoration: none;
    }
  }

  .submenu {
    cursor: pointer;
    position: relative;
  }
}

.item-text {
  color: #409eff;
  padding: 0 10px;
  margin: 0 -10px;
  font-size: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
<style lang="scss">
.context-menu-item-li-2025 {
  padding: 0 !important;

  & > * {
    padding: 5px 16px !important;
  }
}
</style>