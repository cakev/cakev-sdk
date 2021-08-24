import { computeHeight, computeWidth, restrictToBounds, snapToGrid } from '@/vue3/components-style/d-vdr/fns'

export default (val, data) => {
	const [newWidth, _] = snapToGrid(val, 0, data.scale)
	let right = restrictToBounds(data.parentWidth - newWidth - data.left, data.bounds.minRight, data.bounds.maxRight)
	let bottom = data.bottom
	if (data.lockAspectRatio) {
		bottom = data.bottom - (data.right - right) / data.aspectFactor
	}
	const width = computeWidth(data.parentWidth, data.left, right)
	const height = computeHeight(data.parentHeight, data.top, bottom)
	data.right = right
	data.bottom = bottom
	data.width = width
	data.height = height
}
