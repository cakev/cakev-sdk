import Manager from '@dorring/sdk/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default async (data, props) => {
	data.handle = ''
	const diffX = data.left - state.manager.screen.currentScreen.widgets[props.id].x
	const diffY = data.top - state.manager.screen.currentScreen.widgets[props.id].y
	// 拖动控制柄
	const widget = state.manager.screen.currentScreen.widgets[props.id]
	if (data.resizing) {
		data.resizing = false
		data.clientX = 0
		data.clientY = 0
		if (widget) {
			widget.x = data.left
			widget.width = data.width
			widget.height = data.height
			widget.y = data.top
		}
		state.manager.temporary.widgetDragClientX = 0
		state.manager.temporary.widgetDragClientY = 0
	}

	// 拖动组件
	for (let key in state.manager.screen.currentWidgetDragging) {
		const widget = state.manager.screen.currentScreen.widgets[key]
		if (widget) {
			widget.x += diffX
			widget.y += diffY
		}
	}
	state.manager.screen.currentWidgetDragging = {}
	state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
}
