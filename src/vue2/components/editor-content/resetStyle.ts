import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (data) => {
	const offsetX = state.manager.temporary.offsetX
	const offsetY = state.manager.temporary.offsetY
	const zoom = state.manager.temporary.zoom
	data.dom['editorContent'].style.transform = `translate3d(${offsetX}px,${offsetY}px, 0) scale(${zoom})`
}
