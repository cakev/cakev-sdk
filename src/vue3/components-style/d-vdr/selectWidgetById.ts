import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e: PointerEvent, id) => {
	if (e.shiftKey) {
		manager.screen.selectWidgetById(id)
	} else {
		manager.screen.cancelSelectWidget()
		manager.screen.selectWidgetById(id)
	}
}
