import { computed } from '@vue/composition-api'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default computed({
	get: () => {
		return {
			backgroundColor: manager.screen.currentScreen.backgroundColor,
			width: manager.screen.currentScreen.width + 'px',
			height: manager.screen.currentScreen.height + 'px',
		}
	},
	// @ts-ignore
	set: value => {},
})
