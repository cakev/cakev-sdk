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
		x?: number
		y?: number
	}) {
		super(obj)
		this.id = 'w' + Math.random().toString(16).replace('.', '')
		this.x = obj.x
		this.y = obj.y
	}
}
