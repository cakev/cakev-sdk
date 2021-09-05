import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default id => {
	state.manager.screen.currentScreen.widgetsLayers.forEach(item => {
		if (item.id === state.manager.screen.currentWidgets[0]) {
			item.scene = id
			state.manager.screen.cancelSelectWidget()
		}
	})
}
