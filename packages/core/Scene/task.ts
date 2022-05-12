export default class SceneTask {
	name: number | string = ''

	constructor(name: number | string) {
		this.name = `场景${name}`
	}
}
