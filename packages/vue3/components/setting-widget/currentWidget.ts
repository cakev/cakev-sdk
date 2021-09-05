import { computed, reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default computed(() => {
	return state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]]
})
