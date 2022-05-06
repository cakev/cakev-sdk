import Factory from '@/core/Base/factory'
import IndexDB from '@/core/IndexDB'

export default class BaseCache extends Factory<BaseCache> {
	db: IndexDB | null // indexDB 实例
	expirationTime: number // 过期时间

	constructor(db: IndexDB) {
		super()
		this.db = db
	}
}
