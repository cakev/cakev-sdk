import Dexie from 'dexie'

type ImageCacheDB = {
	id?: number
	picture?: Blob
	name?: string
}

type ScreenCacheDB = {
	id?: number
	data?: string
	name?: string
}

export default class IndexDB extends Dexie {
	public imageCache: Dexie.Table<ImageCacheDB, number>
	public screenCache: Dexie.Table<ScreenCacheDB, number>

	public constructor() {
		super('dorring')
		this.version(1).stores({
			imageCache: '++id,picture,name',
		})
		this.version(2).stores({
			screenCache: '++id,data,name',
		})
		this.imageCache = this.table('imageCache')
		this.screenCache = this.table('screenCache')
	}
}
