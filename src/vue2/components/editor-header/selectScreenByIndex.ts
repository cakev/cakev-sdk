import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (index) => {
	manager.screen.selectScreenByIndex(index)
}
