export const on = function(
	element: HTMLElement | Document | Window,
	event: string,
	handler: EventListenerOrEventListenerObject,
	useCapture = false,
): void {
	if (element && event && handler) {
		element.addEventListener(event, handler, useCapture)
	}
}
