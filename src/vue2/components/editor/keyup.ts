import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	manager.temporary.editorContentDragging = false
	manager.temporary.editorContentDrag = false
}
