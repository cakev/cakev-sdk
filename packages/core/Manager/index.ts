import Factory from '@dorring/sdk/core/Base/factory'
import Log from '@dorring/sdk/core/Log'
import Http from '@dorring/sdk/core/Http'
import Screen from '@dorring/sdk/core/Screen'
import Temporary from '@dorring/sdk/core/Temporary'
import ScreenCache from '@dorring/sdk/core/IndexDB/screenCache'
import ImageCache from '@dorring/sdk/core/IndexDB/imageCache'
import IndexDB from '@dorring/sdk/core/IndexDB'

const db = new IndexDB()

export default class Manager extends Factory<Manager> {
	http: Http = Http.Instance({
		errorJudge: res => res.code === 0,
	})
	screen: Screen = Screen.Instance()
	temporary: Temporary = Temporary.Instance()
	log: Log = Log.Instance()
	version = process.env.version
	screenCache: ScreenCache = ScreenCache.Instance(db)
	imageCache: ImageCache = ImageCache.Instance(db)
}
