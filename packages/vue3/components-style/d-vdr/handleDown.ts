import Manager from '@dorring/sdk/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

// 控制柄按下
export default (e, handle, data) => {
	data.handle = handle
	data.resizing = true
	state.manager.temporary.widgetDragClientX = e.clientX
	state.manager.temporary.widgetDragClientY = e.clientY
}
