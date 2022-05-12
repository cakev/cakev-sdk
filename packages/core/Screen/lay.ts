export default class {
	scene: Number | String = ''
	widgetId = ''
	zIndex = 10
	hide = false

	constructor({ scene, widgetId, zIndex, hide }) {
		this.scene = scene
		this.widgetId = widgetId
		this.zIndex = zIndex
		this.hide = hide
	}
}
