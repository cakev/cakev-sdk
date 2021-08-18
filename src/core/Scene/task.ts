export default class SceneTask {
	id: string
	name: string

	constructor(id?: string) {
		if (id === '0') {
			this.id = '0'
			this.name = '主场景'
		} else if (id === '-1') {
			this.id = '-1'
			this.name = '回收站'
		} else {
			const id = 's' + Math.random().toString(16).replace('.', '')
			this.id = id
			this.name = '场景' + id
		}
	}
}
