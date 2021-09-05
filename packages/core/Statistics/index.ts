import Factory from '@dorring/sdk/core/Base/factory'
import StatisticsTask from '@dorring/sdk/core/Statistics/task'

export default class Statistics extends Factory<Statistics> {
	cookieId = 'statistics-102343423'
	task: StatisticsTask
	startTime: number

	init() {
		this.task = new StatisticsTask(this.cookieId)
		this.startTime = +new Date()
	}
}
