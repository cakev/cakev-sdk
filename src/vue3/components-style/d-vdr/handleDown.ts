import calcResizeLimits from './calcResizeLimits'
import { on } from '@/vue3/utils/dom'

// 控制柄按下
export default (e, handle, data) => {
	if (e instanceof MouseEvent && e.which !== 1) {
		return
	}

	if (e.stopPropagation) e.stopPropagation()

	// Here we avoid a dangerous recursion by faking
	// corner handles as middle handles
	if (data.lockAspectRatio && !handle.includes('m')) {
		data.handle = 'm' + handle.substring(1)
	} else {
		data.handle = handle
	}

	data.resizing = true

	data.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
	data.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY
	data.mouseClickPosition.left = data.left
	data.mouseClickPosition.right = data.right
	data.mouseClickPosition.top = data.top
	data.mouseClickPosition.bottom = data.bottom
	data.mouseClickPosition.w = data.width
	data.mouseClickPosition.h = data.height

	data.bounds = calcResizeLimits(data)

	on(document.documentElement, 'mousemove', data.mouseMove)
	on(document.documentElement, 'mouseup', data.mouseUp)
}
