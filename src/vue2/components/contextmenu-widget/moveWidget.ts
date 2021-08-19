import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
export default id => {
	manager.screen.currentScreen.widgetsLayers.forEach(item => {
		if (item.id === manager.screen.currentWidgets[0]) {
			item.scene = id
			manager.screen.cancelSelectWidget()
		}
	})
}
