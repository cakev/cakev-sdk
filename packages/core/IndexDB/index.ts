import Dexie from 'dexie'

export default class IndexDB extends Dexie {
	screenCache: Dexie.Table

	constructor() {
		super('cakeVDB')
		this.version(1).stores({
			screenCache: '++id,value,name',
		})
		this.screenCache = this.table('screenCache')
	}
}
