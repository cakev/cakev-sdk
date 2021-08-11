import Factory from '@/core/Base/factory'
import LogTask from '@/core/Log/task'

export default class Log extends Factory<Log> {
	list: LogTask[] = []

	push(log: LogTask): void {
		this.list = [...this.list, log]
	}

	clear(): void {
		this.list = []
	}

	constructor() {
		super()
	}
}
