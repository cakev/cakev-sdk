// 从控制柄松开
export default async (data, emit) => {
	data.handle = ''
	if (data.resizing) {
		data.resizing = false
		console.log(data.left, data.top, data.width, data.height)
		emit('resizestop', data.left, data.top, data.width, data.height)
		data.mouseClickPosition = { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }
	}
	if (data.dragging) {
		data.dragging = false
		emit('dragstop', data.left, data.top)
	}
}
