import { computeHeight, computeWidth, restrictToBounds, snapToGrid } from '@/vue3/components-style/d-vdr/fns'

export default (val, data) => {
	const [_, newHeight] = snapToGrid(0, val, data.scale)
	let bottom = restrictToBounds(
		data.parentHeight - newHeight - data.top,
		data.bounds.minBottom,
		data.bounds.maxBottom,
	)
	let right = data.right
	if (data.lockAspectRatio) {
		right = data.right - (data.bottom - bottom) * data.aspectFactor
	}
	const width = computeWidth(data.parentWidth, data.left, right)
	const height = computeHeight(data.parentHeight, data.top, bottom)
	data.right = right
	data.bottom = bottom
	data.width = width
	data.height = height
}
