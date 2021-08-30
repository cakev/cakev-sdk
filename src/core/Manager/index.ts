import Factory from '@/core/Base/factory'
import Log from '@/core/Log'
import Http from '@/core/Http'
import Screen from '@/core/Screen'
import Temporary from '@/core/Temporary'

export default class Manager extends Factory<Manager> {
	http: Http = Http.Instance({
		errorJudge: res => res.code === 0,
	})
	screen: Screen = Screen.Instance()
	temporary: Temporary = Temporary.Instance()
	log: Log = Log.Instance()
}
