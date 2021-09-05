import { ElNotification } from 'element-plus'
import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import dblclick from '@dorring/sdk/vue3/components/editor-header/dblclick'
import createScreen from '@dorring/sdk/vue3/components/editor-header/createScreen'
import selectScreenByIndex from '@dorring/sdk/vue3/components/editor-header/selectScreenByIndex'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default data => {
	data.zoomMenuState = false
	data.nameMenuState = true
	const children = state.manager.screen.screenList.map((item, index) => {
		return {
			label: item.name,
			disabled: item.id === state.manager.screen.currentScreen.id,
			handler: () => {
				selectScreenByIndex(index)
				data.nameMenuState = false
				ElNotification({
					title: '切换大屏成功',
					type: 'success',
					message: `大屏名：${item.name}`,
				})
			},
		}
	})
	data.nameList = [
		{
			label: '重命名大屏',
			handler: () => {
				data.nameMenuState = false
				dblclick(data)
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
				data.nameMenuState = false
				ElNotification({
					title: '创建大屏成功',
					type: 'success',
					message: `大屏名：${state.manager.screen.currentScreen.name}`,
				})
			},
		},
	]
}
