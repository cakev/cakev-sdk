import BaseCache from '@/core/IndexDB/baseCache'

export default class ScreenCache extends BaseCache {
	async add(name: string, value: any): Promise<any> {
		const collection: ScreenCacheDB = await this.db.screenCache.get({ name })
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
		const collection: ScreenCacheDB = await this.db.screenCache.get({ name })
		if (collection) {
			return JSON.parse(collection.value)
		} else {
			return {}
		}
	}
}
