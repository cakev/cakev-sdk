import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (e: KeyboardEvent, id) => {
	if (e.shiftKey) {
		state.manager.screen.selectWidgetById(id)
	} else {
		state.manager.screen.selectOneWidget(id)
	}
}
