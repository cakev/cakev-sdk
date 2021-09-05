import { ElNotification, ElMessageBox } from 'element-plus'
import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	const message =
		state.manager.screen.currentScene.id === '-1'
			? '清空回收站？所有组件将不复存在'
			: '清空当前场景？该场景所有组件将进入回收站'
	ElMessageBox.confirm(message, '确认信息', {
		confirmButtonText: '确认',
		cancelButtonText: '放弃',
	}).then(() => {
		const message =
			state.manager.screen.currentScene.id === '-1'
				? '场景名：回收站'
				: `场景名：${state.manager.screen.currentScene.name}`
		ElNotification({
			title: '清空场景成功',
			type: 'success',
			message: message,
		})
		state.manager.screen.clearScene()
	})
}
