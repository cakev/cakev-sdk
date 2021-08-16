import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e: KeyboardEvent) => {
	if (e.keyCode === 32) {
		manager.temporary.editorContentDrag = true
	}
}
