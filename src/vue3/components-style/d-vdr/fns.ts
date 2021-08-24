export function isFunction(func: Function): boolean {
	return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]'
}

export function snapToGrid(pendingX: number, pendingY: number, scale = 1): [number, number] {
	const x = Math.round(pendingX / scale)
	const y = Math.round(pendingY / scale)
	return [x, y]
}

export function computeWidth(parentWidth: number, left: number, right: number): number {
	return parentWidth - left - right
}

export function computeHeight(parentHeight: number, top: number, bottom: number): number {
	return parentHeight - top - bottom
}

export function restrictToBounds(value: number, min: number, max: number): number {
	if (min !== null && value < min) {
		return min
	}

	if (max !== null && max < value) {
		return max
	}

	return value
}
