*Base*: 
1. 参考el-select 传入一个options去渲染下拉，
2. v-model绑定一个数组，返回选中的值,方法提供onChange
3. 通过value-key 来指定value的key （value）
4. 通过label-key 来指定label的key （label）
5. 通过once来控制一次是否选一个就关闭弹窗

6. 普通的筛选
7. 可拖拽的筛选
   1. 仅对v-model生效，对于未被选择的项不生效