import WidgetConfig from '@dorring/sdk/core/Widget/conf'
import WidgetAnimation from '@dorring/sdk/core/Widget/animation'
import WidgetApi from '@dorring/sdk/core/Widget/api'
import WidgetBorder from '@dorring/sdk/core/Widget/border'

export default class Widget extends WidgetConfig {
	id: string
	x: number
	y: number
	group = false
	hide = false
	lock = false

	constructor(obj: {
		name: string
		width: number
		height: number
		data?: Array<any>
		version?: string
		type?: string
		avatar?: string
		backgroundColor?: string[]
		gradientDirection?: number
		color?: string | null
		fontSize?: number
		lineHeight?: number
		border?: WidgetBorder | null
		textAlign?: 'left' | 'right' | 'center'
		animation?: WidgetAnimation | null
		api?: WidgetApi | null
		group?: boolean
		x: number
		y: number
	}) {
		super(obj)
		this.id = 'w' + Math.random().toString(16).replace('.', '')
		this.x = obj.x
		this.y = obj.y
		if (obj.group) this.group = obj.group
	}
}
