import BaseCache from '@dorring/sdk/core/IndexDB/baseCache'

type ScreenCacheDB = {
	id?: number
	data?: string
	name?: string
}

export default class ScreenCache extends BaseCache {
	async add(name: string, data) {
		return new Promise(resolve => {
			this.db.screenCache.get({ name }).then((collection: ScreenCacheDB) => {
				if (collection) {
					this.db.screenCache.put({
						id: collection.id,
						name,
						data: JSON.stringify(data),
					})
					resolve(null)
				} else {
					this.db.screenCache.put({
						name,
						data: JSON.stringify(data),
					})
					resolve(null)
				}
			})
		})
	}

	async get(name: string): Promise<any> {
		return new Promise(resolve => {
			if (!name) resolve(null)
			this.db.screenCache
				.get({ name })
				.then((collection: ScreenCacheDB) => {
					if (collection) {
						resolve(JSON.parse(JSON.parse(collection.data)))
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
