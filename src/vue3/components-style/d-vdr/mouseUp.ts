import conflictCheck from './conflictCheck'
import { off } from '@/vue3/utils/dom'
import resetBoundsAndMouseState from './resetBoundsAndMouseState'

// 从控制柄松开
export default async (data, emit) => {
	data.handle = null

	// 初始化辅助线数据
	const temArr = new Array(3).fill({ display: false, position: '', origin: '', lineLength: '' })
	const refLine = { vLine: [], hLine: [] }
	for (let i in refLine) {
		refLine[i] = JSON.parse(JSON.stringify(temArr))
	}

	if (data.resizing) {
		data.resizing = false
		await conflictCheck(data)
		emit('refLineParams', refLine)
		emit('resizestop', data.left, data.top, data.width, data.height)
	}
	if (data.dragging) {
		data.dragging = false
		await conflictCheck(data)
		emit('refLineParams', refLine)
		// emit('dragstop', data.left, data.top)
	}
	resetBoundsAndMouseState(data)
	off(document.documentElement, 'mousemove', data.mouseUp)
}
