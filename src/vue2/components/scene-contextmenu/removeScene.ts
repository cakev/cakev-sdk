import { Notification, MessageBox } from 'element-ui'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	MessageBox.confirm('删除当前场景？该场景所有组件将进入回收站', '确认信息', {
		confirmButtonText: '确认',
		cancelButtonText: '放弃',
	}).then(() => {
		const name = manager.screen.currentScene.name
		Notification({
			title: '删除场景成功',
			type: 'success',
			message: `场景名：${name}`,
		})
		manager.screen.removeScene()
	})
}
