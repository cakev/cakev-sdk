// 控制柄按下
export default (e: MouseEvent, handle, data) => {
	if (data.lockAspectRatio && !handle.includes('m')) {
		data.handle = 'm' + handle.substring(1)
	} else {
		data.handle = handle
	}
	data.resizing = true
	data.mouseClickPosition.mouseX = e.pageX
	data.mouseClickPosition.mouseY = e.pageY
	data.mouseClickPosition.left = data.left
	data.mouseClickPosition.right = data.right
	data.mouseClickPosition.top = data.top
	data.mouseClickPosition.bottom = data.bottom
	data.mouseClickPosition.w = data.width
	data.mouseClickPosition.h = data.height
}
