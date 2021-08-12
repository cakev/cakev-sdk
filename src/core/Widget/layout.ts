export default class WidgetLayout {
	zIndex = 10
	hide = false
	scene: string
	id: string

	constructor(obj: { zIndex?: number; scene?: string; id?: string }) {
		if (obj.zIndex) this.zIndex = obj.zIndex
		this.scene = obj.scene
		this.id = obj.id
	}
}
