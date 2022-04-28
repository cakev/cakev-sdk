import Factory from '@/core/Base/factory'

export default class Emitter extends Factory<Emitter> {
	private events: any = {}
	constructor() {
		super()
		this.events = {}
	}
	on(event: string, callback: Function): Emitter {
		const callbacks = this.events[event] || []
		callbacks.push(callback)
		this.events[event] = callbacks
		return this
	}
	off(event: string, callback: Function): Emitter {
		const callbacks = this.events[event]
		this.events[event] = callbacks && callbacks.filter((fn: Function) => fn !== callback)
		return this
	}
	emit(...args: any): Emitter {
		const event = args[0]
		const params = [].slice.call(args, 1)
		const callbacks = this.events[event]
		if (callbacks) {
			callbacks.forEach((fn: Function) => fn.apply(this, params))
		}
		return this
	}
	once(event: string, callback: Function): Emitter {
		const wrapFunc = (...args: any) => {
			callback.apply(this, args)
			this.off(event, wrapFunc)
		}
		this.on(event, wrapFunc)
		return this
	}
}
