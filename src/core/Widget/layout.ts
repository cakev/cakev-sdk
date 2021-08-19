export default class WidgetLayout {
	zIndex = 10
	hide = false
	lock = false
	scene: string
	id: string
	children: Array<WidgetLayout> = []
	group = false

	constructor(obj: { zIndex: number; scene: string; id: string; children?: Array<WidgetLayout>; group?: boolean }) {
		this.zIndex = obj.zIndex
		this.scene = obj.scene
		this.id = obj.id
		if (obj.children) this.children = obj.children
		if (obj.group) this.group = obj.group
	}
}
