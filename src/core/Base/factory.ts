// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class Singleton<T> {
	static Instance<T>(obj?: any): T {
		if (!window.dorring) window.dorring = { instance: {} }
		if (!window.dorring.instance[this.name]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.dorring.instance[this.name] = new this(obj)
		}
		return window.dorring.instance[this.name]
	}
}

export default class Factory<T> extends Singleton<T> {}
