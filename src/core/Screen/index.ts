import Factory from '@/core/Base/factory'
import ScreenTask from '@/core/Screen/task'
const md5 = require('md5')

export default class Screen extends Factory<Screen> {
	current: ScreenTask | null = null
	screenList: Array<ScreenTask> = []
	screenMd5SchemaList: Array<string> = []
	checkChange(id) {
		const now = md5(JSON.stringify(this.current))
		let old
		this.screenList.forEach((item, index) => {
			if (item.id === id) {
				old = this.screenMd5SchemaList[index]
			}
		})
		return old === now
	}

	removeScreenById(id) {
		this.screenList.forEach((item, index) => {
			if (item.id === id) {
				this.screenList.splice(index, 1)
				this.screenMd5SchemaList.splice(index, 1)
			}
			if (item.id === this.current.id) {
				if (this.screenList.length > 0) {
					this.current = this.screenList[0]
				} else {
					this.current = null
				}
			}
		})
	}

	selectScreenByIndex(index) {
		this.current = this.screenList[index]
	}

	createScreen(id) {
		const screen: ScreenTask = new ScreenTask(id)
		this.screenMd5SchemaList.push(md5(JSON.stringify(screen)))
		this.screenList.push(screen)
		if (!this.current) this.current = screen
	}

	constructor() {
		super()
	}
}
