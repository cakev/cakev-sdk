// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class Singleton<T> {
	private static instance: any = null
	static Instance<T>(obj?: any): T {
		if (this.instance == null) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.instance = new this(obj)
		}
		return this.instance
	}
}

export default class Factory<T> extends Singleton<T> {}
