import { computeHeight, computeWidth, restrictToBounds, snapToGrid } from './fns'
import snapCheck from './snapCheck'

// 控制柄移动
const handleResize = (e, data, props, emit) => {
	let left = data.left
	let top = data.top
	let right = data.right
	let bottom = data.bottom

	const mouseClickPosition = data.mouseClickPosition
	const aspectFactor = data.aspectFactor

	const tmpDeltaX = mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX)
	const tmpDeltaY = mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY)

	if (!data.widthTouched && tmpDeltaX) {
		data.widthTouched = true
	}
	if (!data.heightTouched && tmpDeltaY) {
		data.heightTouched = true
	}
	const [deltaX, deltaY] = snapToGrid(tmpDeltaX, tmpDeltaY, props.scaleRatio)
	const resizingOnX = Boolean(data.handle) && (data.handle.includes('l') || data.handle.includes('r'))
	const resizingOnY = Boolean(data.handle) && (data.handle.includes('t') || data.handle.includes('b'))

	if (data.handle.includes('b')) {
		bottom = restrictToBounds(mouseClickPosition.bottom + deltaY, data.bounds.minBottom, data.bounds.maxBottom)
		if (data.lockAspectRatio && resizingOnY) {
			right = data.right - (data.bottom - bottom) * aspectFactor
		}
	} else if (data.handle.includes('t')) {
		top = restrictToBounds(mouseClickPosition.top - deltaY, data.bounds.minTop, data.bounds.maxTop)
		if (data.lockAspectRatio && resizingOnY) {
			left = data.left - (data.top - top) * aspectFactor
		}
	}

	if (data.handle.includes('r')) {
		right = restrictToBounds(mouseClickPosition.right + deltaX, data.bounds.minRight, data.bounds.maxRight)
		if (data.lockAspectRatio && resizingOnX) {
			bottom = data.bottom - (data.right - right) / aspectFactor
		}
	} else if (data.handle.includes('l')) {
		left = restrictToBounds(mouseClickPosition.left - deltaX, data.bounds.minLeft, data.bounds.maxLeft)
		if (data.lockAspectRatio && resizingOnX) {
			top = data.top - (data.left - left) / aspectFactor
		}
	}

	const width = computeWidth(data.parentWidth, left, right)
	const height = computeHeight(data.parentHeight, top, bottom)
	data.left = left
	data.top = top
	data.right = right
	data.bottom = bottom
	data.width = width
	data.height = height
	emit('resizing', data.left, data.top, data.width, data.height)
}

// 元素移动
const handleDrag = async (e, data, props, emit) => {
	const axis = props.axis
	const bounds = data.bounds
	const mouseClickPosition = data.mouseClickPosition

	const tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0
	const tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0

	const [deltaX, deltaY] = snapToGrid(tmpDeltaX, tmpDeltaY, props.scaleRatio)

	const left = restrictToBounds(mouseClickPosition.left - deltaX, bounds.minLeft, bounds.maxLeft)
	const top = restrictToBounds(mouseClickPosition.top - deltaY, bounds.minTop, bounds.maxTop)
	const right = restrictToBounds(mouseClickPosition.right + deltaX, bounds.minRight, bounds.maxRight)
	const bottom = restrictToBounds(mouseClickPosition.bottom + deltaY, bounds.minBottom, bounds.maxBottom)
	data.left = left
	data.top = top
	data.right = right
	data.bottom = bottom
	await snapCheck(data, emit)
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
