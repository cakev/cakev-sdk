// 控制柄移动
const handleResize = (e: MouseEvent, data, props, emit) => {
	let left = data.left
	let top = data.top
	let right = data.right
	let bottom = data.bottom

	const mouseClickPosition = data.mouseClickPosition
	const aspectFactor = data.aspectFactor

	const tmpDeltaX = mouseClickPosition.mouseX - e.pageX
	const tmpDeltaY = mouseClickPosition.mouseY - e.pageY

	if (!data.widthTouched && tmpDeltaX) {
		data.widthTouched = true
	}
	if (!data.heightTouched && tmpDeltaY) {
		data.heightTouched = true
	}
	const deltaX = Math.round(tmpDeltaX / props.scaleRatio)
	const deltaY = Math.round(tmpDeltaY / props.scaleRatio)
	const resizingOnX = Boolean(data.handle) && (data.handle.includes('l') || data.handle.includes('r'))
	const resizingOnY = Boolean(data.handle) && (data.handle.includes('t') || data.handle.includes('b'))
	if (data.handle.includes('b')) {
		bottom = mouseClickPosition.bottom + deltaY
		if (data.lockAspectRatio && resizingOnY) {
			right = data.right - (data.bottom - bottom) * aspectFactor
		}
	} else if (data.handle.includes('t')) {
		top = mouseClickPosition.top - deltaY
		if (data.lockAspectRatio && resizingOnY) {
			left = data.left - (data.top - top) * aspectFactor
		}
	}

	if (data.handle.includes('r')) {
		right = mouseClickPosition.right + deltaX
		if (data.lockAspectRatio && resizingOnX) {
			bottom = data.bottom - (data.right - right) / aspectFactor
		}
	} else if (data.handle.includes('l')) {
		left = mouseClickPosition.left - deltaX
		if (data.lockAspectRatio && resizingOnX) {
			top = data.top - (data.left - left) / aspectFactor
		}
	}
	data.left = left
	data.top = top
	data.right = right
	data.bottom = bottom
	data.width = right - left
	data.height = bottom - top
	emit('resizing', data.left, data.top, data.width, data.height)
}

// 元素移动
const handleDrag = (e: MouseEvent, data, props, emit) => {
	const axis = props.axis
	const mouseClickPosition = data.mouseClickPosition
	const tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - e.pageX : 0
	const tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - e.pageY : 0
	const deltaX = Math.round(tmpDeltaX / props.scaleRatio)
	const deltaY = Math.round(tmpDeltaY / props.scaleRatio)
	const left = mouseClickPosition.left - deltaX
	const top = mouseClickPosition.top - deltaY
	const right = mouseClickPosition.right + deltaX
	const bottom = mouseClickPosition.bottom + deltaY
	data.left = left
	data.top = top
	data.right = right
	data.bottom = bottom
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
