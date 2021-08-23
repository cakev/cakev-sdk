// 正则获取left与top
export default string => {
	let [left, top] = string.style.transform.replace(/[^0-9\-,]/g, '').split(',')
	if (top === undefined) top = 0
	return [+left, +top]
}
