import Factory from '@dorring/sdk/core/Base/factory'
import IndexDB from '@dorring/sdk/core/IndexDB'

export default class BaseCache extends Factory<BaseCache> {
	// indexDB 实例
	db: IndexDB | null
	// 过期时间
	expirationTime: number

	constructor(db: IndexDB) {
		super()
		this.db = db
	}
}
