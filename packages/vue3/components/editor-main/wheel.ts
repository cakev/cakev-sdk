import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default e => {
	if (e.ctrlKey) {
		if (e.wheelDeltaY !== 0) {
			if (e.wheelDeltaY > 0) {
				state.manager.temporary.zoomIn()
			} else {
				state.manager.temporary.zoomOut()
			}
		}
	} else {
		if (e.wheelDeltaY !== 0) {
			if (e.wheelDeltaY > 0) {
				state.manager.temporary.scrollTop()
			} else {
				state.manager.temporary.scrollBottom()
			}
		}
		if (e.wheelDeltaX !== 0) {
			if (e.wheelDeltaX > 0) {
				state.manager.temporary.scrollRight()
			} else {
				state.manager.temporary.scrollLeft()
			}
		}
	}
}
