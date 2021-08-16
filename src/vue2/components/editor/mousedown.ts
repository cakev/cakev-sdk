import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e) => {
	if (e.buttons !== 1 || e.which !== 1) return
	if (manager.temporary.editorContentDrag) {
		manager.temporary.editorContentStartX = e.layerX
		manager.temporary.editorContentStartY = e.layerY
		manager.temporary.editorContentDragging = true
	}
}
