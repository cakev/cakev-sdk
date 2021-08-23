// 设置属性
export default data => {
	// 设置冲突检测
	data.dom['vdr'].setAttribute('data-is-check', `${data.isConflictCheck}`)
	// 设置对齐元素
	data.dom['vdr'].setAttribute('data-is-snap', `${data.snap}`)
}
