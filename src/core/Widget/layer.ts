export default class WidgetLayer {
	zIndex = 10
	scene: string
	id: string
	widgets: Array<WidgetLayer> = []
	group = false

	constructor(obj: { zIndex: number; scene: string; id: string; widgets?: Array<WidgetLayer>; group?: boolean }) {
		this.zIndex = obj.zIndex
		this.scene = obj.scene
		this.id = obj.id
		if (obj.widgets) this.widgets = obj.widgets
		if (obj.group) this.group = obj.group
	}
}
