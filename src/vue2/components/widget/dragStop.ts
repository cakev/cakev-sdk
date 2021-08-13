import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (left: number, top: number) => {
	if (manager.screen.currentWidgets[0]) {
		manager.screen.currentWidgets[0].x = left
		manager.screen.currentWidgets[0].y = top
	}
}
