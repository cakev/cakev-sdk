// 控制柄移动
const handleResize = (e, data, props, emit) => {
	let left = data.left
	let top = data.top
	let right = data.left + data.width
	let bottom = data.top + data.height
	const diffX = (e.clientX - data.clientX) / props.scaleRatio
	const diffY = (e.clientY - data.clientY) / props.scaleRatio
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
	data.clientX = e.clientX
	data.clientY = e.clientY
	emit('resizing', data.left, data.top, data.width, data.height)
}

// 元素移动
const handleDrag = (e, data, props, emit) => {
	const diffX = (e.clientX - data.clientX) / props.scaleRatio
	const diffY = (e.clientY - data.clientY) / props.scaleRatio
	data.left = data.left + diffX
	data.top = data.top + diffY
	data.clientX = e.clientX
	data.clientY = e.clientY
	emit('dragging', data.left, data.top)
}

// 移动
export default (e, data, props, emit) => {
	if (data.resizing) {
		handleResize(e, data, props, emit)
	} else if (data.dragging) {
		handleDrag(e, data, props, emit)
	}
}
