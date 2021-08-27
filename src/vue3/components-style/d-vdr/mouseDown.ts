import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

// 元素按下
export default (e, data, props) => {
	if (e.buttons === 1) {
		if (props.draggable) {
			data.dragging = true
		}
		if (!data.enabled) {
			data.enabled = true
			if (e.shiftKey) {
				state.manager.screen.selectWidgetById(props.id)
			} else {
				state.manager.screen.selectOneWidget(props.id)
			}
		}
		data.clientX = e.clientX
		data.clientY = e.clientY
	}
	if (e.buttons === 2) {
		e.stopPropagation()
		e.preventDefault()
	}
}
