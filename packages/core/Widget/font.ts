export default class WidgetFont {
	color: string = 'rgba(51,51,51,1)'
	textAlign: 'left' | 'right' | 'center' = 'left'
	size = 16
	lineHeight = 32

	constructor(obj?: { color?: string; textAlign?: 'left' | 'right' | 'center'; size?: number; lineHeight?: number }) {
		if (obj) {
			if (obj.color) this.color = obj.color
			if (obj.textAlign) this.textAlign = obj.textAlign
			if (obj.size) this.size = obj.size
			if (obj.lineHeight) this.lineHeight = obj.lineHeight
		}
	}
}
