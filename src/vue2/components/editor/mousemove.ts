import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default e => {
	if (manager.temporary.editorContentDragging) {
		const diffX = e.layerX - manager.temporary.editorContentStartX
		const diffY = e.layerY - manager.temporary.editorContentStartY
		manager.temporary.offsetX = manager.temporary.offsetX + diffX
		manager.temporary.offsetY = manager.temporary.offsetY + diffY
		manager.temporary.editorContentStartX = e.layerX
		manager.temporary.editorContentStartY = e.layerY
	}
}
