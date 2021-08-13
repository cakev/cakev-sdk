import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default context => {
	const offsetX = manager.temporary.offsetX
	const offsetY = manager.temporary.offsetY
	const zoom = manager.temporary.zoom
	context.refs['editor-content'].style.transform = `translate3d(${offsetX}px,${offsetY}px, 0) scale(${zoom})`
}
