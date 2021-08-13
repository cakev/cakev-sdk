import Factory from '@/core/Base/factory'

export default class Temporary extends Factory<Temporary> {
	vLine = [] // 参考线
	hLine = [] // 参考线
	zoom = 1 // 放大缩小比例
	
	clear() {
		this.vLine = []
		this.hLine = []
	}

	constructor() {
		super()
	}
}
