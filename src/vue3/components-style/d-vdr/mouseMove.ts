import Manager from '@/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

// 控制柄移动
const handleResize = (e, data, props) => {
	let left = data.left
	let top = data.top
	let right = data.left + data.width
	let bottom = data.top + data.height
	const diffX = Math.round((e.clientX - state.manager.temporary.widgetDragClientX) / props.scaleRatio)
	const diffY = Math.round((e.clientY - state.manager.temporary.widgetDragClientY) / props.scaleRatio)
	if (data.handle.includes('b')) {
		bottom = bottom + diffY
	} else if (data.handle.includes('t')) {
		top = top + diffY
	}

	if (data.handle.includes('r')) {
		right = right + diffX
	} else if (data.handle.includes('l')) {
		left = left + diffX
	}
	data.left = left
	data.top = top
	data.width = right - left
	data.height = bottom - top
	state.manager.temporary.widgetDragClientX = e.clientX
	state.manager.temporary.widgetDragClientY = e.clientY
}

// 元素移动
const handleDrag = (e, data, props) => {
	const diffX = Math.round((e.clientX - state.manager.temporary.widgetDragClientX) / props.scaleRatio)
	const diffY = Math.round((e.clientY - state.manager.temporary.widgetDragClientY) / props.scaleRatio)
	data.left = data.left + diffX
	data.top = data.top + diffY
	state.manager.temporary.widgetDragClientX = e.clientX
	state.manager.temporary.widgetDragClientY = e.clientY
}

// 移动
export default (e, data, props) => {
	console.log(data.resizing, state.manager.screen.currentWidgetDragging[props.id], props.id)
	if (data.resizing) {
		handleResize(e, data, props)
	} else if (state.manager.screen.currentWidgetDragging[props.id]) {
		handleDrag(e, data, props)
	}
}
