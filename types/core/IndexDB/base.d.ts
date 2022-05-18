import Factory from '../Base/factory';
import IndexDB from '../IndexDB';
export default class BaseCache extends Factory<BaseCache> {
    db: IndexDB;
    constructor(db: IndexDB);
}
