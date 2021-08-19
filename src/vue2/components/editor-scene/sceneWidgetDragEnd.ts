import Manager from '@/core/Manager'
import WidgetLayer from '@/core/Widget/layer'
const manager: Manager = Manager.Instance()

export default e => {
	const oldLay: WidgetLayer = manager.screen.sceneWidgetsBySortList[e.moved.oldIndex]
	const newLay: WidgetLayer = manager.screen.sceneWidgetsBySortList[e.moved.newIndex]
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
	manager.screen.currentScreen.widgetsLayers = [ ...manager.screen.currentScreen.widgetsLayers ]
}
