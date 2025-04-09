import { defineComponent } from 'vue'
export default (mountedFn : () => void = ()=>{}, updatedFn = () => {}) => {
  return defineComponent({
    name: 'getSlots',
    setup(props, ctx) {
      console.log('setup', props, ctx)
    },
    mounted() {
      mountedFn()
    },
    updated() {
      updatedFn()
    },
    render(props : any, ctx : any) {
      return props.$attrs.vnode
    },
  })
}