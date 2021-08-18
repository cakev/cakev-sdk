import WidgetConfig from '@/core/Widget/conf'
import { Method } from 'axios'

export default class Widget extends WidgetConfig {
	id: string
	x: number
	y: number

	constructor(obj: {
		type: string
		name: string
		version: string
		width: number
		height: number
		data: Array<any>
		avatar?: string
		backgroundColor?: string | null
		apiUrl?: string
		apiMethod?: Method
		x?: number
		y?: number
	}) {
		super(obj)
		this.id = 'w' + Math.random().toString(16).replace('.', '')
		this.x = obj.x
		this.y = obj.y
	}
}
