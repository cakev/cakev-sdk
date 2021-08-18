import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	const id = Math.random().toString(16).replace('.', '')
	manager.screen.createScreen(id)
	manager.screen.selectScreenByIndex(manager.screen.screenList.length - 1)
}
