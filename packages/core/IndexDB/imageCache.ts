import BaseCache from '@dorring/sdk/core/IndexDB/baseCache'

type ImageCacheDB = {
	id?: number
	picture?: Blob
	name?: string
}

export default class ImageCache extends BaseCache {
	add(name: string, url) {
		this.db.imageCache.get({ name }).then(async (collection: ImageCacheDB) => {
			const res = await fetch(url)
			const blob = await res.blob()
			if (collection) {
				this.db.imageCache.put({
					id: collection.id,
					name,
					picture: blob,
				})
			} else {
				this.db.imageCache.put({
					name,
					picture: blob,
				})
			}
		})
	}

	async get(name: string): Promise<string> {
		if (!name) return
		const collection: ImageCacheDB = await this.db.imageCache.get({ name })
		if (collection) {
			return window.URL.createObjectURL(collection.picture)
		} else {
			this.add(name, name)
			return name
		}
	}
}
