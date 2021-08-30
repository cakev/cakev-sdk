import { Method } from 'axios'
import HttpTask from '@/core/Http/task'
import LogTask from '@/core/Log/task'
import Manager from '@/core/Manager'
import { reactive } from 'vue'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (obj: {
	method?: Method
	url: string
	params?: any
	id?: string
	loop?: boolean
	loopTime?: number
	headers?: any
}) => {
	let id = obj.id
	if (!id) id = String(+new Date())
	state.manager.http.pushOne(
		new HttpTask(obj)
			.then(res => {
				state.manager.screen.currentScreen.widgets[obj.id].data = res
			})
			.catch(e => {
				state.manager.log.push(new LogTask({ code: 'HTTP_ERROR', ...e }))
			}),
		id,
	)
}
