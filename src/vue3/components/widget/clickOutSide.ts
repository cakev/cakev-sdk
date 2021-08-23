import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	state.manager.temporary.widgetsRightMenu = false
}
