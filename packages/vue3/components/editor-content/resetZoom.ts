import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	const pDom: HTMLElement = document.getElementById('editor-content').parentElement
	let zoom
	const zoomX = ~~((pDom.offsetWidth / state.manager.screen.currentScreen.width) * 100) / 100
	const zoomY = ~~((pDom.offsetHeight / state.manager.screen.currentScreen.height) * 100) / 100
	zoomX > zoomY ? (zoom = zoomY) : (zoom = zoomX)
	if (zoom % 2 !== 0) zoom = zoom - 0.1
	if (zoom < 0.2) {
		zoom = 0.2
	}
	zoom = +zoom.toFixed(2)
	state.manager.temporary.zoom = zoom
	const offsetX = (pDom.offsetWidth - state.manager.screen.currentScreen.width * zoom) / 2
	const offsetY = (pDom.offsetHeight - state.manager.screen.currentScreen.height * zoom) / 2
	state.manager.temporary.offsetX = offsetX
	state.manager.temporary.offsetY = offsetY
	document.getElementById(
		'editor-content',
	).style.transform = `translate3d(${offsetX}px,${offsetY}px, 0) scale(${zoom})`
}
