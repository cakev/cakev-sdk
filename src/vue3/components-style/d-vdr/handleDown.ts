// 控制柄按下
export default (e, handle, data) => {
	data.handle = handle
	data.resizing = true
	data.clientX = e.clientX
	data.clientY = e.clientY
}
