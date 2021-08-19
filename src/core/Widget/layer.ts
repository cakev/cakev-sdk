export default class WidgetLayer {
	zIndex = 10
	hide = false
	lock = false
	scene: string
	id: string
	children: Array<WidgetLayer> = []
	group = false

	constructor(obj: { zIndex: number; scene: string; id: string; children?: Array<WidgetLayer>; group?: boolean }) {
		this.zIndex = obj.zIndex
		this.scene = obj.scene
		this.id = obj.id
		if (obj.children) this.children = obj.children
		if (obj.group) this.group = obj.group
	}
}
