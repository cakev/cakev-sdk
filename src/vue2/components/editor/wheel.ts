import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default e => {
	if (e.ctrlKey) {
		if (e.wheelDeltaY !== 0) {
			if (e.wheelDeltaY > 0) {
				manager.temporary.zoomIn()
			} else {
				manager.temporary.zoomOut()
			}
		}
	} else {
		if (e.wheelDeltaY !== 0) {
			if (e.wheelDeltaY > 0) {
				manager.temporary.scrollTop()
			} else {
				manager.temporary.scrollBottom()
			}
		}
		if (e.wheelDeltaX !== 0) {
			if (e.wheelDeltaX > 0) {
				manager.temporary.scrollRight()
			} else {
				manager.temporary.scrollLeft()
			}
		}
	}
}
