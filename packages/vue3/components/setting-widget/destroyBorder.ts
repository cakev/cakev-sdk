import Manager from '@dorring/sdk/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].border = null
	state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
}
