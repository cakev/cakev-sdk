import { computed } from '@vue/composition-api'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default computed({
	get: () => {
		return {
			left: manager.temporary.sceneRightMenuX + 'px',
			top: manager.temporary.sceneRightMenuY + 'px',
		}
	},
	// @ts-ignore
	set: value => {},
})
