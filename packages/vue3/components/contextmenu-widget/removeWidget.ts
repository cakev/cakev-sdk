import { ElNotification, ElMessageBox } from 'element-plus'
import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	ElMessageBox.confirm('删除当前组件？', '确认信息', {
		confirmButtonText: '确认',
		cancelButtonText: '放弃',
	}).then(() => {
		const name = state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].name
		ElNotification({
			title: '删除组件成功',
			type: 'success',
			message: `组件名：${name}`,
		})
		state.manager.screen.removeWidget()
	})
}
