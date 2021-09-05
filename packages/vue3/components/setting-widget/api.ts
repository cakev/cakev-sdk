import { computed, reactive } from 'vue'
import removeApi from './removeApi'
import createApi from './createApi'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default computed({
	get: () => {
		if (state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api) {
			if (state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api.url) {
				return 'api'
			}
			return 'static'
		} else if (state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].data.length) {
			return 'static'
		}
		return 'no'
	},
	set: val => {
		if (val === 'no') {
			removeApi()
			state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].data = []
		}
		if (val === 'static') {
			if (!state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].data.length) {
				state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].data = [
					'hello world',
				]
			}
			createApi()
		}
		if (val === 'api') createApi({ url: '/example' })
	},
})
