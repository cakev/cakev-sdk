import formatTransformVal from './formatTransformVal'

// 冲突检测
export default data => {
	const top = data.top
	const left = data.left
	const width = data.width
	const height = data.height

	if (data.isConflictCheck) {
		const nodes = data.$el.parentNode.childNodes // 获取当前父节点下所有子节点
		for (let item of nodes) {
			if (
				item.className !== undefined &&
				!item.className.includes(data.classNameActive) &&
				item.getAttribute('data-is-check') !== null &&
				item.getAttribute('data-is-check') !== 'false'
			) {
				const tw = item.offsetWidth
				const th = item.offsetHeight
				// 正则获取left与right
				let [tl, tt] = formatTransformVal(item)

				// 左上角与右下角重叠
				const tfAndBr =
					(top >= tt && left >= tl && tt + th > top && tl + tw > left) ||
					(top <= tt && left < tl && top + height > tt && left + width > tl)
				// 右上角与左下角重叠
				const brAndTf =
					(left <= tl && top >= tt && left + width > tl && top < tt + th) ||
					(top < tt && left > tl && top + height > tt && left < tl + tw)
				// 下边与上边重叠
				const bAndT =
					(top <= tt && left >= tl && top + height > tt && left < tl + tw) ||
					(top >= tt && left <= tl && top < tt + th && left > tl + tw)
				// 上边与下边重叠（宽度不一样）
				const tAndB =
					(top <= tt && left >= tl && top + height > tt && left < tl + tw) ||
					(top >= tt && left <= tl && top < tt + th && left > tl + tw)
				// 左边与右边重叠
				const lAndR =
					(left >= tl && top >= tt && left < tl + tw && top < tt + th) ||
					(top > tt && left <= tl && left + width > tl && top < tt + th)
				// 左边与右边重叠（高度不一样）
				const rAndL =
					(top <= tt && left >= tl && top + height > tt && left < tl + tw) ||
					(top >= tt && left <= tl && top < tt + th && left + width > tl)

				// 如果冲突，就将回退到移动前的位置
				if (tfAndBr || brAndTf || bAndT || tAndB || lAndR || rAndL) {
					data.top = data.mouseClickPosition.top
					data.left = data.mouseClickPosition.left
					data.right = data.mouseClickPosition.right
					data.bottom = data.mouseClickPosition.bottom
					data.width = data.mouseClickPosition.w
					data.height = data.mouseClickPosition.h
				}
			}
		}
	}
}
