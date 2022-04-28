// 添加事件
export function addEvent(el, event, handler) {
	if (!el) {
		return
	}
	if (el.attachEvent) {
		el.attachEvent('on' + event, handler)
	} else if (el.addEventListener) {
		el.addEventListener(event, handler, true)
	} else {
		el['on' + event] = handler
	}
}

// 删除事件
export function removeEvent(el, event, handler) {
	if (!el) {
		return
	}
	if (el.detachEvent) {
		el.detachEvent('on' + event, handler)
	} else if (el.removeEventListener) {
		el.removeEventListener(event, handler, true)
	} else {
		el['on' + event] = null
	}
}
