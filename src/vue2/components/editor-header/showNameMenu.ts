import selectScreenByIndex from '@/vue2/components/editor-header/selectScreenByIndex'
import { Notification } from 'element-ui'
import dblclick from '@/vue2/components/editor-header/dblclick'
import createScreen from '@/vue2/components/editor-header/createScreen'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
export default ({ state, context }) => {
	state.nameMenuState = true
	const children = manager.screen.screenList.map((item, index) => {
		return {
			label: item.name,
			disabled: item.id === manager.screen.currentScreen.id,
			handler: () => {
				selectScreenByIndex(index)
				state.nameMenuState = false
				Notification({
					title: '切换大屏成功',
					type: 'success',
					message: `大屏名：${item.name}`,
				})
			},
		}
	})
	state.list = [
		{
			label: '重命名大屏',
			handler: () => {
				state.nameMenuState = false
				dblclick({ state, context })
			},
		},
		{
			label: '切换大屏',
			children,
		},
		{
			label: '创建大屏',
			handler: () => {
				createScreen()
				state.nameMenuState = false
				Notification({
					title: '创建大屏成功',
					type: 'success',
					message: `大屏名：${manager.screen.currentScreen.name}`,
				})
			},
		},
	]
}
