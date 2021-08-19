import Manager from '@/core/Manager'
import WidgetLayer from '@/core/Widget/layer'
const manager: Manager = Manager.Instance()

export default (e: PointerEvent, widget: WidgetLayer) => {
	if (manager.screen.currentWidgets.length <= 1) {
		manager.screen.cancelSelectWidget()
		manager.screen.selectWidgetById(widget.id)
		manager.temporary.widgetRightMenu = false
		setTimeout(() => {
			manager.temporary.widgetRightMenu = true
		})
		manager.temporary.widgetRightMenuX = e.clientX
		manager.temporary.widgetRightMenuY = e.clientY
	}
	if (manager.screen.currentWidgets.length > 1) {
		manager.temporary.widgetsRightMenu = false
		setTimeout(() => {
			manager.temporary.widgetsRightMenu = true
		})
		manager.temporary.widgetsRightMenuX = e.clientX
		manager.temporary.widgetsRightMenuY = e.clientY
	}
}
