import WidgetConfig from '@/core/Widget/conf'

export default class Widget extends WidgetConfig {
	id: string
	x: number
	y: number
	
	constructor(obj: {
		avatar?: string
		type: string
		name: string
		version: string
		width: number
		height: number
		backgroundColor?: string | null
		data: Array<any>
		startX?: number
		startY?: number
		endX?: number
		endY?: number
	}) {
		super(obj)
		this.id = 'w' + Math.random().toString(16).replace('.', '')
		if (obj.startX) this.x = obj.endX - obj.startX
		if (obj.startY) this.y = obj.endY - obj.startY
	}
}
