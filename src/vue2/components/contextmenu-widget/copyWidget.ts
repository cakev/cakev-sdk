import { Notification } from 'element-ui'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	manager.screen.copyWidget()
	const name = manager.screen.currentScreen.widgets[manager.screen.currentWidgets[0]].name
	Notification({
		title: '复制组件成功',
		type: 'success',
		message: `组件名：${name}`,
	})
}
