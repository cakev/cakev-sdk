import Emitter from './emitter'
import Task from './task'

export default class Http extends Emitter {
	limit = 1
	screenDomain: string // 大屏组件接口Domain
	screenHeaders: string // 大屏组件接口Headers
	loopPool: { [key: string]: Task } = {} // 时间loop任务队列
	waitPool: Array<Task> = [] // 待请求任务队列
	currentPool: Array<Task> = [] // 请求任务队列
	loading = false
	static POOL_START = 'POOL_START'
	static POOL_ADD = 'POOL_ADD'
	static POOL_UPDATE = 'POOL_UPDATE'
	static POOL_STOP = 'POOL_STOP'

	timer: any = null
	constructor() {
		super()
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
		this.emit(Http.POOL_ADD)
		if (!this.loading) {
			this.emit(Http.POOL_START)
			this.run()
		}
	}

	retry(t: Task, res) {
		t.errorCount++
		if (t.errorCount < t.maxErrorCount) {
			t.status = Task.STATUS_RETRY
			this.push2Wait(t)
		} else {
			t.catchCallBack(res)
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
				list.push(task.request({ screenDomain: this.screenDomain, screenHeaders: this.screenHeaders }))
			})
			Promise.allSettled(list).then(result => {
				this.emit(Http.POOL_UPDATE)
				result.forEach((res, index) => {
					const task: Task = this.currentPool[index]
					if (res.status === 'rejected') {
						if (task.loopTime === 0) {
							this.retry(task, res)
						}
					} else {
						task.status = Task.STATUS_FINISH
						task.thenCallBack(res.value)
					}
					task.lastTime = Date.now()
				})
				this.run()
			})
		} else {
			this.stop()
		}
	}
	
	// 停止某一个请求
	abortOne(id: string): void {
		delete this.loopPool[id]
	}

	// 清空队列中的请求
	abortAll(): void {
		this.waitPool = []
		this.loopPool = {}
		this.currentPool = []
		this.stop()
		this.stopLoop()
	}

	stop() {
		this.loading = false
		this.emit(Http.POOL_STOP)
	}
	
	stopLoop() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}
}
