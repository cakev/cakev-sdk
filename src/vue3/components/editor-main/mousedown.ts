import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default e => {
	if (e.buttons !== 1 || e.which !== 1) return
	if (state.manager.temporary.editorContentDrag) {
		state.manager.temporary.editorContentStartX = e.layerX
		state.manager.temporary.editorContentStartY = e.layerY
		state.manager.temporary.editorContentDragging = true
	}
}
