import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default context => {
	const dom: HTMLElement = context.parent.$el
	let zoom
	const zoomX = ~~((dom.offsetWidth / manager.screen.currentScreen.width) * 100) / 100
	const zoomY = ~~((dom.offsetHeight / manager.screen.currentScreen.height) * 100) / 100
	zoomX > zoomY ? (zoom = zoomY) : (zoom = zoomX)
	if (zoom % 2 !== 0) zoom = zoom - 0.1
	if (zoom < 0.2) {
		zoom = 0.2
	}
	manager.temporary.zoom = zoom
	const offsetX = (dom.offsetWidth - manager.screen.currentScreen.width * zoom) / 2
	const offsetY = (dom.offsetHeight - manager.screen.currentScreen.height * zoom) / 2
	context.refs['editor-content'].style.transform = `translate3d(${offsetX}px,${offsetY}px, 0) scale(${zoom})`
}
