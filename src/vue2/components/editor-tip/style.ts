import { computed } from '@vue/composition-api'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default computed({
	get: () => {
		const offsetY = manager.temporary.offsetY + manager.screen.currentScreen.height * manager.temporary.zoom + 10
		const offsetX = manager.temporary.offsetX
		return {
			top: offsetY + 'px',
			left: offsetX + 'px',
		}
	},
	// @ts-ignore
	set: value => {},
})
