import { reactive } from 'vue'
import Manager from '@/core/Manager'
import Widget from '@/core/Widget/task'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (left: number, top: number, width: number, height: number) => {
	const widget: Widget = state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]]
	if (widget) {
		widget.x = left
		widget.width = width
		widget.height = height
		widget.y = top
	}
}
