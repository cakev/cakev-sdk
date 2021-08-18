import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e: MouseEvent, id) => {
	if (e.buttons !== 1 || e.which !== 1) return
	console.log(manager.screen.currentWidgets)
	if (e.shiftKey) {
		manager.screen.selectWidgetById(id)
	} else {
		manager.screen.cancelSelectWidget()
		manager.screen.selectWidgetById(id)
	}
}
