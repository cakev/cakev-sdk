import { Notification, MessageBox } from 'element-ui'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	MessageBox.confirm('删除当前组件？', '确认信息', {
		confirmButtonText: '确认',
		cancelButtonText: '放弃',
	}).then(() => {
		const name = manager.screen.currentScreen.widgets[manager.screen.currentWidgets[0]].name
		Notification({
			title: '完成删除组件',
			type: 'success',
			message: `组件名：${name}`,
		})
		manager.screen.removeWidget()
	})
}
