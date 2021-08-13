import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (left: number, top: number, width: number, height: number) => {
	manager.screen.currentWidgets[0].x = left
	manager.screen.currentWidgets[0].width = width
	manager.screen.currentWidgets[0].height = height
	manager.screen.currentWidgets[0].y = top
}
