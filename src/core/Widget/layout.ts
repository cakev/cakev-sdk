export default class WidgetLayout {
	zIndex = 10
	hide = false
	lock = false
	scene: string
	id: string
	temporary?: boolean

	constructor(obj: { zIndex: number; scene: string; id: string; temporary?: boolean }) {
		this.zIndex = obj.zIndex
		this.scene = obj.scene
		this.id = obj.id
		this.temporary = obj.temporary || false
	}
}
