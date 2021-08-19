import { computed } from '@vue/composition-api'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default computed({
	get: () => {
		return manager.screen.currentScreen.widgets[manager.screen.currentWidgets[0]]
	},
	// @ts-ignore
	set: value => {
	},
})
