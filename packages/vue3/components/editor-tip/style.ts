import { computed, reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default computed(() => {
	const offsetY =
		state.manager.temporary.offsetY + state.manager.screen.currentScreen.height * state.manager.temporary.zoom + 10
	const offsetX = state.manager.temporary.offsetX
	return {
		top: offsetY + 'px',
		left: offsetX + 'px',
	}
})
