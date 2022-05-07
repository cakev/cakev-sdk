import Task from './task'
import Factory from '../Base/factory'
import WidgetTask from '../Widget/task'
import HttpTask from './task'
import { usePath, useProcess } from '@/vue2/utils'

export default class Http extends Factory<Http> {
	limit = 1
	loopPool: { [key: string]: Task } = {} // 时间loop任务队列
	waitPool: Array<Task> = [] // 待请求任务队列
	currentPool: Array<Task> = [] // 请求任务队列
	loading = false

	timer: any = null

	request(widget: WidgetTask, { domain, headers }): void {
		const { url, method, path, processEnable, processBody, autoFetchEnable, autoFetchDuration } = widget.widgetApi
		let { params } = widget.widgetApi
		const loopTime = autoFetchEnable ? autoFetchDuration : 0
		try {
			params = JSON.parse(params)
		} catch (e) {
			// console.log(e)
		}
		this.pushOne(
			new HttpTask({ method, url, params, loopTime, domain, headers }).then(res => {
				let response = usePath(path, res)
				if (processEnable) response = useProcess(processBody, response)
				if (response !== undefined) widget.widgetApi.data = JSON.stringify(response)
			}),
			widget.widgetId,
		)
	}

	pushOne(task: Task, id: string): void {
		if (task.loopTime > 0) {
			this.loopPool[id] = task
			this.startInterval()
		}
		this.push2Wait(task)
	}

	push2Wait(task: Task) {
		this.waitPool.push(task)
		task.status = Task.STATUS_WAIT
		if (!this.loading) {
			this.run()
		}
	}

	retry(t: Task, res) {
		t.errorCount++
		if (t.errorCount < t.maxErrorCount) {
			t.status = Task.STATUS_RETRY
			this.push2Wait(t)
		} else {
			typeof t.catchCallBack === 'function' && t.catchCallBack(res)
		}
	}

	startInterval(): void {
		if (this.timer) return
		this.timer = setInterval(() => {
			Object.keys(this.loopPool).forEach(key => {
				if (Date.now() - this.loopPool[key].lastTime > this.loopPool[key].loopTime && this.loopPool[key]) {
					this.push2Wait(this.loopPool[key])
				}
			})
		}, 1000)
	}

	run() {
		this.loading = true
		if (this.waitPool.length > 0) {
			this.currentPool = this.waitPool.splice(0, this.limit)
			const list: Array<Promise<any>> = []
			this.currentPool.forEach(task => {
				task.status = Task.STATUS_READY
				list.push(task.create())
			})
			Promise.allSettled(list).then(result => {
				result.forEach((res, index) => {
					const task: Task = this.currentPool[index]
					if (res.status === 'rejected') {
						if (task.loopTime === 0) {
							this.retry(task, res)
						}
					} else {
						task.status = Task.STATUS_FINISH
						typeof task.thenCallBack === 'function' && task.thenCallBack(res.value)
					}
					task.lastTime = Date.now()
				})
				this.run()
			})
		} else {
			this.stop()
		}
	}

	abortOne(id: string): void {
		delete this.loopPool[id]
	}

	abortAll(): void {
		this.waitPool = []
		this.loopPool = {}
		this.currentPool = []
		this.stop()
		this.stopLoop()
	}

	stop() {
		this.loading = false
	}

	stopLoop() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}
}
