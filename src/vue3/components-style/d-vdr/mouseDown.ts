import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

// 元素按下
export default (e: MouseEvent, data, props) => {
	if (e.buttons === 1) {
		if (props.draggable) {
			data.dragging = true
		}
		data.enabled = true
		if (e.shiftKey) {
			state.manager.screen.selectWidgetById(props.id)
		} else {
			state.manager.screen.selectOneWidget(props.id)
		}
		data.mouseClickPosition.mouseX = e.pageX
		data.mouseClickPosition.mouseY = e.pageY
		data.mouseClickPosition.left = data.left
		data.mouseClickPosition.right = data.right
		data.mouseClickPosition.top = data.top
		data.mouseClickPosition.bottom = data.bottom
		data.mouseClickPosition.w = data.width
		data.mouseClickPosition.h = data.height
		
	}
	if (e.buttons === 2) {
		e.stopPropagation()
		e.preventDefault()
	}
	
}
