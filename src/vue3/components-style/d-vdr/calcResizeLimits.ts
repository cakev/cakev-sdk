// 计算调整大小范围
export default data => {
	let minW = data.minW
	let minH = data.minH
	let maxW = data.maxW
	let maxH = data.maxH

	const aspectFactor = data.aspectFactor
	const [gridX, gridY] = data.grid
	const width = data.width
	const height = data.height
	const left = data.left
	const top = data.top
	const right = data.right
	const bottom = data.bottom

	if (data.lockAspectRatio) {
		if (minW / minH > aspectFactor) {
			minH = minW / aspectFactor
		} else {
			minW = aspectFactor * minH
		}

		if (maxW && maxH) {
			maxW = Math.min(maxW, aspectFactor * maxH)
			maxH = Math.min(maxH, maxW / aspectFactor)
		} else if (maxW) {
			maxH = maxW / aspectFactor
		} else if (maxH) {
			maxW = aspectFactor * maxH
		}
	}

	maxW = maxW - (maxW % gridX)
	maxH = maxH - (maxH % gridY)

	const limits = {
		minLeft: null,
		maxLeft: null,
		minTop: null,
		maxTop: null,
		minRight: null,
		maxRight: null,
		minBottom: null,
		maxBottom: null,
	}

	limits.minLeft = null
	limits.maxLeft = left + Math.floor((width - minW) / gridX) * gridX
	limits.minTop = null
	limits.maxTop = top + Math.floor((height - minH) / gridY) * gridY
	limits.minRight = null
	limits.maxRight = right + Math.floor((width - minW) / gridX) * gridX
	limits.minBottom = null
	limits.maxBottom = bottom + Math.floor((height - minH) / gridY) * gridY

	if (maxW) {
		limits.minLeft = -(right + maxW)
		limits.minRight = -(left + maxW)
	}

	if (maxH) {
		limits.minTop = -(bottom + maxH)
		limits.minBottom = -(top + maxH)
	}

	if (data.lockAspectRatio && maxW && maxH) {
		limits.minLeft = Math.min(limits.minLeft, -(right + maxW))
		limits.minTop = Math.min(limits.minTop, -(maxH + bottom))
		limits.minRight = Math.min(limits.minRight, -left - maxW)
		limits.minBottom = Math.min(limits.minBottom, -top - maxH)
	}

	return limits
}
