import { ElNotification } from 'element-plus'
import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	state.manager.screen.copyWidget()
	const name = state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].name
	ElNotification({
		title: '复制组件成功',
		type: 'success',
		message: `组件名：${name}`,
	})
}
