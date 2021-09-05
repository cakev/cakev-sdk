import selectSceneById from './selectSceneById'
import Manager from '@dorring/sdk/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (e: MouseEvent, id, data) => {
	if (!data.editScene[id]) {
		selectSceneById(id)
		state.manager.temporary.sceneRightMenu = false
		setTimeout(() => {
			state.manager.temporary.sceneRightMenu = true
		})
		state.manager.temporary.sceneRightMenuX = e.clientX
		state.manager.temporary.sceneRightMenuY = e.clientY
	}
}
