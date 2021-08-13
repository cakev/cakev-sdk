import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()
export default () => {
	manager.temporary.widgetRightMenu = false
	manager.screen.cancelSelectWidget()
}
