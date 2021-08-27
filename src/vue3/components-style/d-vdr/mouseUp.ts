import Manager from '@/core/Manager'
import { reactive } from 'vue'
import Widget from '@/core/Widget/task'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

// 从控制柄松开
export default async (data, props) => {
	data.handle = ''
	const widget: Widget = state.manager.screen.currentScreen.widgets[props.id]
	if (data.resizing) {
		data.resizing = false
		if (widget) {
			widget.x = data.left
			widget.width = data.width
			widget.height = data.height
			widget.y = data.top
		}
		state.manager.temporary.widgetDragClientX = 0
		state.manager.temporary.widgetDragClientY = 0
	}
	if (state.manager.screen.currentWidgetDragging[props.id]) {
		state.manager.screen.currentWidgetDragging = {}
		if (state.manager.screen.currentWidgets.length === 1) {
			if (widget) {
				widget.x = data.left
				widget.y = data.top
			}
		}
	}
	state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
}
