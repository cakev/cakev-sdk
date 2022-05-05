import BaseCache from '@/core/IndexDB/baseCache'

export default class ImageCache extends BaseCache {
	async add(name: string): Promise<any> {
		const collection: ImageCacheDB = await this.db.imageCache.get({ name })
		const res = await fetch(name)
		const blob = await res.blob()
		if (collection) {
			return this.db.imageCache.update(collection.id, {
				name,
				picture: blob,
			})
		} else {
			return this.db.imageCache.put({
				name,
				picture: blob,
			})
		}
	}

	async get(name: string): Promise<string> {
		if (!name) return
		const collection: ImageCacheDB = await this.db.imageCache.get({ name })
		if (collection) {
			return window.URL.createObjectURL(collection.picture)
		} else {
			this.add(name)
			return name
		}
	}
}
