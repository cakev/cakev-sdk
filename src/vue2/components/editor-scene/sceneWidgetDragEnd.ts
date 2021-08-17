import Manager from '@/core/Manager'
import WidgetLayout from '@/core/Widget/layout'
const manager: Manager = Manager.Instance()

export default e => {
	const oldLay: WidgetLayout = manager.screen.sceneWidgetsBySortList[e.moved.oldIndex]
	const newLay: WidgetLayout = manager.screen.sceneWidgetsBySortList[e.moved.newIndex]
	if (oldLay.zIndex === newLay.zIndex) {
		if (e.moved.newIndex > e.moved.oldIndex) {
			newLay.zIndex++
		} else {
			oldLay.zIndex++
		}
	} else {
		let zIndex = newLay.zIndex
		newLay.zIndex = oldLay.zIndex
		oldLay.zIndex = zIndex
	}
	manager.screen.currentScreen.widgetsLays = [ ...manager.screen.currentScreen.widgetsLays ]
}
