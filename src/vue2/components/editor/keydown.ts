import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (e: KeyboardEvent) => {
	if (e.keyCode === 32) {
		state.manager.temporary.editorContentDrag = true
	}
}
