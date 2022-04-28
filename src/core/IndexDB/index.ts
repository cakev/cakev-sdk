import Dexie from 'dexie'

export default class IndexDB extends Dexie {
	public imageCache: Dexie.Table<ImageCacheDB, number>
	public screenCache: Dexie.Table<ScreenCacheDB, number>

	public constructor() {
		super('EslinkVDB')
		this.version(1).stores({
			imageCache: '++id,picture,name',
		})
		this.version(1).stores({
			screenCache: '++id,value,name',
		})
		this.imageCache = this.table('imageCache')
		this.screenCache = this.table('screenCache')
	}
}
