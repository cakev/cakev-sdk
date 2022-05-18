import Base from '../IndexDB/base'

export default class ScreenCache extends Base {
	async add(name: string, value: any): Promise<any> {
		const collection = await this.db.screenCache.get({ name })
		if (collection) {
			return this.db.screenCache.update(collection.id, {
				name,
				value: JSON.stringify(value),
			})
		} else {
			return this.db.screenCache.put({
				name,
				value: JSON.stringify(value),
			})
		}
	}

	async get(name: string): Promise<any> {
		if (!name) return
		const collection = await this.db.screenCache.get({ name })
		if (collection) {
			return JSON.parse(collection.value)
		} else {
			return {}
		}
	}
}
