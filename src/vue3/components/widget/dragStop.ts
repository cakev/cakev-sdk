import { reactive } from 'vue'
import Manager from '@/core/Manager'
import Widget from '@/core/Widget/task'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (left: number, top: number) => {
	if (state.manager.screen.currentWidgets.length === 1) {
		const widget: Widget = state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]]
		if (widget) {
			widget.x = left
			widget.y = top
			state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
		}
	}
}
