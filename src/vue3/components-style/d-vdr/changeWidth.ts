export default (val, data) => {
	const newWidth = Math.round(val / data.scale)
	let right = data.left - newWidth
	let bottom = data.bottom
	if (data.lockAspectRatio) {
		bottom = data.bottom - (data.right - right) / data.aspectFactor
	}
	const width = right - data.left
	const height = bottom - data.top
	data.right = right
	data.bottom = bottom
	data.width = width
	data.height = height
}
