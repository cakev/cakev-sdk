export default class WidgetBorder {
	color: string = 'rgba(0,0,0,1)'
	width = [1, 1, 1, 1]
	type: 'solid' | 'dashed' | 'double' | 'dotted' | 'none' = 'solid'

	constructor(obj?: { color?: string; width?: number[]; type?: 'solid' | 'dashed' | 'double' | 'dotted' | 'none' }) {
		if (obj) {
			if (obj.color) this.color = obj.color
			if (obj.width) this.width = obj.width
			if (obj.type) this.type = obj.type
		}
	}
}
