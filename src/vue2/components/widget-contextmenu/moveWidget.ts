import Manager from '@/core/Manager'
import { Notification } from 'element-ui'

const manager: Manager = Manager.Instance()
export default id => {
	manager.screen.currentScreen.widgetsLays.forEach(item => {
		if (item.id === manager.screen.currentWidgets[0]) {
			const oldName = manager.screen.currentScreen.scenes[item.scene].name
			const newName = manager.screen.currentScreen.scenes[id].name
			const name = manager.screen.currentScreen.widgets[manager.screen.currentWidgets[0]].name
			item.scene = id
			manager.screen.cancelSelectWidget()
			Notification({
				title: '移动组件成功',
				type: 'success',
				dangerouslyUseHTMLString: true,
				message: `组件名：${name}<br/>移动前场景名：${oldName}<br/>移动后场景名：${newName}`,
			})
		}
	})
}
