export default class Scene {
	name: number | string

	constructor(name: number | string) {
		this.name = `场景${name}`
	}
}
