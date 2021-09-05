import { ElNotification, ElMessageBox } from 'element-plus'
import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default () => {
	ElMessageBox.confirm('删除当前场景？该场景所有组件将进入回收站', '确认信息', {
		confirmButtonText: '确认',
		cancelButtonText: '放弃',
	}).then(() => {
		const name = state.manager.screen.currentScene.name
		ElNotification({
			title: '删除场景成功',
			type: 'success',
			message: `场景名：${name}`,
		})
		state.manager.screen.removeScene()
	})
}
