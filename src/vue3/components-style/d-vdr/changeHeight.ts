export default (val, data) => {
	const newHeight = Math.round(val / data.scale)
	let bottom = data.top - newHeight
	let right = data.right
	if (data.lockAspectRatio) {
		right = data.right - (data.bottom - bottom) * data.aspectFactor
	}
	const width = right - data.left
	const height = bottom - data.top
	data.right = right
	data.bottom = bottom
	data.width = width
	data.height = height
}
