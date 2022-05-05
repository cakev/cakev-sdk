import Factory from '@/core/Base/factory'
import LogTask from '@/core/Log/task'
import { uuid } from '@/core/utils'

export default class Emitter extends Factory<Emitter> {
	list: { [key: string]: LogTask } = {}

	push(log: LogTask): void {
		let key
		if (log.widget) {
			key = `${log.widget.id}${log.code}`
		} else {
			key = `${uuid()}${log.code}`
		}
		this.list = { ...this.list, [key]: log }
	}

	clear(): void {
		this.list = {}
	}
}
