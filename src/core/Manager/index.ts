import Factory from '@/core/Base/factory'
import HttpTask from '@/core/Http/task'
import LogTask from '@/core/Log/task'
import Log from '@/core/Log'
import Http from '@/core/Http'
import Screen from '@/core/Screen'
import Temporary from '@/core/Temporary'
import { Method } from 'axios'

export default class Manager extends Factory<Manager> {
	http: Http = Http.Instance({
		errorJudge: res => res.code === 0,
		dataPath: res => res.data,
	})
	screen: Screen = Screen.Instance()
	temporary: Temporary = Temporary.Instance()
	log: Log = Log.Instance()

	request(obj: {
		method?: Method
		url: string
		params?: any
		id?: string
		loopTime?: number
		success?: Function
		error?: Function
		headers?: any
	}): void {
		let id = obj.id
		if (!id) id = String(+new Date())
		this.http.pushOne(
			new HttpTask(obj)
				.then(res => {
					typeof obj.success === 'function' && obj.success(res)
				})
				.catch(e => {
					typeof obj.error === 'function' && obj.error(e)
					this.log.push(new LogTask({ code: 'HTTP_ERROR', ...e }))
				}),
			id,
		)
	}
}
