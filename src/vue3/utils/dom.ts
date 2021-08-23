import isServer from './isServer'
import { camelize } from '@vue/shared'

export const on = function (
	element: HTMLElement | Document | Window,
	event: string,
	handler: EventListenerOrEventListenerObject,
	useCapture = false,
): void {
	if (element && event && handler) {
		element.addEventListener(event, handler, useCapture)
	}
}

export const off = function (
	element: HTMLElement | Document | Window,
	event: string,
	handler: EventListenerOrEventListenerObject,
	useCapture = false,
): void {
	if (element && event && handler) {
		element.removeEventListener(event, handler, useCapture)
	}
}

export const once = function (el: HTMLElement, event: string, fn: EventListener): void {
	const listener = function (...args: unknown[]) {
		if (fn) {
			fn.apply(this, args)
		}
		off(el, event, listener)
	}
	on(el, event, listener)
}

export const getStyle = function (element: HTMLElement, styleName: string): string {
	if (isServer) return
	if (!element || !styleName) return null
	styleName = camelize(styleName)
	if (styleName === 'float') {
		styleName = 'cssFloat'
	}
	try {
		const style = element.style[styleName]
		if (style) return style
		const computed = document.defaultView.getComputedStyle(element, '')
		return computed ? computed[styleName] : ''
	} catch (e) {
		return element.style[styleName]
	}
}
