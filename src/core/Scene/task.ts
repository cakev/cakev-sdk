export default class SceneTask {
	id: string
	name: string

	constructor() {
		const id = 's' + Math.random().toString(16).replace('.', '')
		this.id = id
		this.name = '场景' + id
	}
}
