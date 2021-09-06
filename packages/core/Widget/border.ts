export default class WidgetBorder {
	color: string = 'rgba(0,0,0,1)'
	width = [1, 1, 1, 1]
	style: 'solid' | 'dashed' | 'double' | 'dotted' | 'none' | 'inherit' = 'solid'

	constructor(obj?: {
		color?: string
		width?: number[]
		style?: 'solid' | 'dashed' | 'double' | 'dotted' | 'none' | 'inherit'
	}) {
		if (obj) {
			if (obj.color) this.color = obj.color
			if (obj.width) this.width = obj.width
			if (obj.style) this.style = obj.style
		}
	}
}
