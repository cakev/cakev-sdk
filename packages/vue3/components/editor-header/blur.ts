import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default data => {
	if (state.manager.screen.currentScreen.name.replace(/[\r\n]/g, '') === '') {
		state.manager.screen.currentScreen.name = '未命名'
		data.dom['input'].focus()
		setTimeout(() => {
			data.dom['input'].select()
		})
	} else {
		data.editName = false
	}
}
