// 重置边界和鼠标状态
export default data => {
	data.mouseClickPosition = { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }

	data.bounds = {
		minLeft: null,
		maxLeft: null,
		minRight: null,
		maxRight: null,
		minTop: null,
		maxTop: null,
		minBottom: null,
		maxBottom: null,
	}
}
