import {reactive} from "vue";
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default params => {
	const { vLine, hLine } = params
	state.manager.temporary.vLine = vLine
	state.manager.temporary.hLine = hLine
}
