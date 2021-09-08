export default class WidgetBackground {
	color: string[] = ['rgba(255,255,255,0)']
	gradientDirection = 90

	constructor(obj?: { color?: string[]; gradientDirection?: number }) {
		if (obj) {
			if (obj.color) this.color = obj.color
			if (obj.gradientDirection) this.gradientDirection = obj.gradientDirection
		}
	}
}
