// 从控制柄松开
export default async (data, emit) => {
	data.handle = ''
	if (data.resizing) {
		data.resizing = false
		emit('resizestop', data.left, data.top, data.width, data.height)
		data.clientX = 0
		data.clientY = 0
	}
	if (data.dragging) {
		data.dragging = false
		emit('dragstop', data.left, data.top)
	}
}
