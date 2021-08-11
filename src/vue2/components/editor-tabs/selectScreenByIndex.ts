import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (node) => {
	manager.screen.selectScreenByIndex(node.index)
}
