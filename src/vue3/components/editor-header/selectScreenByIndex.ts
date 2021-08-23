import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default index => {
	state.manager.screen.selectScreenByIndex(index)
}
