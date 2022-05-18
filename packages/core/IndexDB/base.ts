import Factory from '../Base/factory'
import IndexDB from '../IndexDB'

export default class BaseCache extends Factory<BaseCache> {
	db: IndexDB // indexDB 实例

	constructor(db: IndexDB) {
		super()
		this.db = db
	}
}
