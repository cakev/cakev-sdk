import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	const id = Math.random().toString(16).replace('.', '')
	state.manager.screen.createScreen(id)
	state.manager.screen.selectScreenByIndex(state.manager.screen.screenList.length - 1)
}
