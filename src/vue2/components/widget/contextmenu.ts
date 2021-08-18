import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e, id) => {
	if (manager.screen.currentWidgets.length === 1) {
		manager.screen.cancelSelectWidget()
		manager.screen.selectWidgetById(id)
		manager.temporary.widgetRightMenu = true
		manager.temporary.widgetRightMenuX = e.clientX
		manager.temporary.widgetRightMenuY = e.clientY
	}
	if (manager.screen.currentWidgets.length > 1) {
		manager.temporary.widgetsRightMenu = true
		manager.temporary.widgetsRightMenuX = e.clientX
		manager.temporary.widgetsRightMenuY = e.clientY
	}
}
