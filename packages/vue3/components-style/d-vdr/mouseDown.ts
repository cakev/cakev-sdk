import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

// 元素按下
export default (e, data, props) => {
	if (e.buttons === 1) {
		state.manager.temporary.clearRightMenu()
		if (props.draggable) {
			if (state.manager.screen.currentWidgets.length > 1) {
				state.manager.screen.currentWidgets.forEach(item => {
					state.manager.screen.currentWidgetDragging[item] = true
				})
			} else {
				state.manager.screen.currentWidgetDragging[props.id] = true
			}
		}
		if (!data.enabled) {
			if (e.shiftKey) {
				state.manager.screen.selectWidgetById(props.id)
			} else {
				state.manager.screen.selectOneWidget(props.id)
			}
		}
		state.manager.temporary.widgetDragClientX = e.clientX
		state.manager.temporary.widgetDragClientY = e.clientY
	}
	if (e.buttons === 2) {
		e.stopPropagation()
		e.preventDefault()
	}
}
