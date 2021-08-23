import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default id => {
	state.manager.screen.selectSceneById(id)
}
