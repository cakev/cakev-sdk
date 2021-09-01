import { Method } from 'axios'
import WidgetApi from '@/core/Widget/api'
import Manager from '@/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (obj?: {
	method?: Method
	url: string
	params?: any
	loop?: boolean
	loopTime?: number
	headers?: any
	path?: string
}) => {
	state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api = new WidgetApi(obj)
	state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
}
