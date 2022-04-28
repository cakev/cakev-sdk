// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class Singleton<T> {
	static Instance<T>(obj?: any): T {
		if (!window.eslinkVEditorInstance) window.eslinkVEditorInstance = {}
		if (!window.eslinkVEditorInstance[this.name]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.eslinkVEditorInstance[this.name] = new this(obj)
		}
		return window.eslinkVEditorInstance[this.name]
	}
}

export default class Factory<T> extends Singleton<T> {}
