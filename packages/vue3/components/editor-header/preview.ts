import Manager from '@dorring/sdk/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	state.manager.screenCache.add(
		'screen-preview',
		JSON.stringify({
			widgets: state.manager.screen.currentScreen.widgets,
			widgetsLayers: state.manager.screen.currentScreen.widgetsLayers,
			layoutMode: state.manager.screen.currentScreen.layoutMode,
			width: state.manager.screen.currentScreen.width,
			height: state.manager.screen.currentScreen.height,
			backgroundColor: state.manager.screen.currentScreen.backgroundColor,
		}),
	)
}
