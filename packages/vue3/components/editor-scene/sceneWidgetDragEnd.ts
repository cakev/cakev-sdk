import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import WidgetLayer from '@dorring/sdk/core/Widget/layer'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default e => {
	const oldLay: WidgetLayer = state.manager.screen.sceneWidgetsBySortList[e.moved.oldIndex]
	const newLay: WidgetLayer = state.manager.screen.sceneWidgetsBySortList[e.moved.newIndex]
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
	state.manager.screen.currentScreen.widgetsLayers = [...state.manager.screen.currentScreen.widgetsLayers]
}
