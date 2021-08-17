import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e, id) => {
	manager.screen.selectWidgetById(id)
	manager.temporary.widgetRightMenu = true
	manager.temporary.widgetRightMenuX = e.clientX
	manager.temporary.widgetRightMenuY = e.clientY
}
