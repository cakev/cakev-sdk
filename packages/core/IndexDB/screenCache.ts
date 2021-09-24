import BaseCache from '@dorring/sdk/core/IndexDB/baseCache'

interface ScreenCacheDB {
	id?: number
	data?: string
	name?: string
}

export default class ScreenCache extends BaseCache {
	add(name: string, data) {
		this.db.screenCache.get({ name }).then((collection: ScreenCacheDB) => {
			if (collection) {
				this.db.screenCache.put({
					id: collection.id,
					name,
					data: JSON.stringify(data),
				})
			} else {
				this.db.screenCache.put({
					name,
					data: JSON.stringify(data),
				})
			}
		})
	}

	async get(name: string): Promise<any> {
		return new Promise(resolve => {
			if (!name) resolve(null)
			this.db.screenCache
				.get({ name })
				.then(collection => {
					if (collection) {
						resolve(JSON.parse(collection.data))
					} else {
						resolve(null)
					}
				})
				.catch(() => {
					resolve(null)
				})
		})
	}
}
