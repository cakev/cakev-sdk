import formatTransformVal from './formatTransformVal'

// 检测对齐元素
export default async (data, emit) => {
	let width = data.width
	let height = data.height
	if (data.snap) {
		let activeLeft = data.left
		let activeRight = data.left + width
		let activeTop = data.top
		let activeBottom = data.top + height

		// 初始化辅助线数据
		const temArr = new Array(3).fill({ display: false, position: '', origin: '', lineLength: '' })
		const refLine = { vLine: [], hLine: [] }
		for (let i in refLine) {
			refLine[i] = JSON.parse(JSON.stringify(temArr))
		}

		// 获取当前父节点下所有子节点
		const nodes = data.$el.parentNode.childNodes

		let tem = {
			value: { x: [[], [], []], y: [[], [], []] },
			display: [],
			position: [],
		}
		const { groupWidth, groupHeight, groupLeft, groupTop, bln } = await data.getActiveAll(nodes)
		if (!bln) {
			width = groupWidth
			height = groupHeight
			activeLeft = groupLeft
			activeRight = groupLeft + groupWidth
			activeTop = groupTop
			activeBottom = groupTop + groupHeight
		}
		for (let item of nodes) {
			if (
				item.className !== undefined &&
				!item.className.includes(data.classNameActive) &&
				item.getAttribute('data-is-snap') !== null &&
				item.getAttribute('data-is-snap') !== 'false'
			) {
				const w = item.offsetWidth
				const h = item.offsetHeight
				const [l, t] = formatTransformVal(item)
				const r = l + w // 对齐目标right
				const b = t + h // 对齐目标的bottom

				const hc = Math.abs(activeTop + height / 2 - (t + h / 2)) <= data.snapTolerance // 水平中线
				const vc = Math.abs(activeLeft + width / 2 - (l + w / 2)) <= data.snapTolerance // 垂直中线

				const ts = Math.abs(t - activeBottom) <= data.snapTolerance // 从上到下
				const TS = Math.abs(b - activeBottom) <= data.snapTolerance // 从上到下
				const bs = Math.abs(t - activeTop) <= data.snapTolerance // 从下到上
				const BS = Math.abs(b - activeTop) <= data.snapTolerance // 从下到上

				const ls = Math.abs(l - activeRight) <= data.snapTolerance // 外左
				const LS = Math.abs(r - activeRight) <= data.snapTolerance // 外左
				const rs = Math.abs(l - activeLeft) <= data.snapTolerance // 外右
				const RS = Math.abs(r - activeLeft) <= data.snapTolerance // 外右

				tem['display'] = [ts, TS, bs, BS, hc, hc, ls, LS, rs, RS, vc, vc]
				tem['position'] = [t, b, t, b, t + h / 2, t + h / 2, l, r, l, r, l + w / 2, l + w / 2]

				if (ts) {
					if (bln) {
						data.top = t - height
						data.bottom = data.parentHeight - data.top - height
					}
					tem.value.y[0].push(l, r, activeLeft, activeRight)
				}
				if (bs) {
					if (bln) {
						data.top = t
						data.bottom = data.parentHeight - data.top - height
					}
					tem.value.y[0].push(l, r, activeLeft, activeRight)
				}
				if (TS) {
					if (bln) {
						data.top = b - height
						data.bottom = data.parentHeight - data.top - height
					}
					tem.value.y[1].push(l, r, activeLeft, activeRight)
				}
				if (BS) {
					if (bln) {
						data.top = b
						data.bottom = data.parentHeight - data.top - height
					}
					tem.value.y[1].push(l, r, activeLeft, activeRight)
				}

				if (ls) {
					if (bln) {
						data.left = l - width
						data.right = data.parentWidth - data.left - width
					}
					tem.value.x[0].push(t, b, activeTop, activeBottom)
				}
				if (rs) {
					if (bln) {
						data.left = l
						data.right = data.parentWidth - data.left - width
					}
					tem.value.x[0].push(t, b, activeTop, activeBottom)
				}
				if (LS) {
					if (bln) {
						data.left = r - width
						data.right = data.parentWidth - data.left - width
					}
					tem.value.x[1].push(t, b, activeTop, activeBottom)
				}
				if (RS) {
					if (bln) {
						data.left = r
						data.right = data.parentWidth - data.left - width
					}
					tem.value.x[1].push(t, b, activeTop, activeBottom)
				}

				if (hc) {
					if (bln) {
						data.top = t + h / 2 - height / 2
						data.bottom = data.parentHeight - data.top - height
					}
					tem.value.y[2].push(l, r, activeLeft, activeRight)
				}
				if (vc) {
					if (bln) {
						data.left = l + w / 2 - width / 2
						data.right = data.parentWidth - data.left - width
					}
					tem.value.x[2].push(t, b, activeTop, activeBottom)
				}
				// 辅助线坐标与是否显示(display)对应的数组,易于循环遍历
				const arrTem = [0, 1, 0, 1, 2, 2, 0, 1, 0, 1, 2, 2]
				for (let i = 0; i <= arrTem.length; i++) {
					// 前6为Y辅助线,后6为X辅助线
					const xory = i < 6 ? 'y' : 'x'
					const horv = i < 6 ? 'hLine' : 'vLine'
					if (tem.display[i]) {
						const length =
							Math.max(...tem.value[xory][arrTem[i]]) - Math.min(...tem.value[xory][arrTem[i]]) + 'px'
						const origin = Math.min(...tem.value[xory][arrTem[i]]) + 'px'
						refLine[horv][arrTem[i]].display = tem.display[i]
						refLine[horv][arrTem[i]].position = tem.position[i] + 'px'
						refLine[horv][arrTem[i]].origin = origin
						refLine[horv][arrTem[i]].lineLength = length
					}
				}
			}
		}
		emit('refLineParams', refLine)
	}
}
