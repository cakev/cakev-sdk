import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default e => {
	if (state.manager.temporary.editorContentDragging) {
		const diffX = e.layerX - state.manager.temporary.editorContentStartX
		const diffY = e.layerY - state.manager.temporary.editorContentStartY
		state.manager.temporary.offsetX = state.manager.temporary.offsetX + diffX
		state.manager.temporary.offsetY = state.manager.temporary.offsetY + diffY
		state.manager.temporary.editorContentStartX = e.layerX
		state.manager.temporary.editorContentStartY = e.layerY
	}
}
