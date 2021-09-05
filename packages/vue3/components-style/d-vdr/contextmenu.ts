import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (e: PointerEvent, id: string) => {
	if (state.manager.screen.currentWidgets.length <= 1) {
		state.manager.screen.selectOneWidget(id)
		state.manager.temporary.clearRightMenu()
		setTimeout(() => {
			state.manager.temporary.widgetRightMenu = true
		})
		state.manager.temporary.widgetRightMenuX = e.clientX
		state.manager.temporary.widgetRightMenuY = e.clientY
	}
	if (state.manager.screen.currentWidgets.length > 1) {
		state.manager.temporary.clearRightMenu()
		setTimeout(() => {
			state.manager.temporary.widgetsRightMenu = true
		})
		state.manager.temporary.widgetsRightMenuX = e.clientX
		state.manager.temporary.widgetsRightMenuY = e.clientY
	}
}
