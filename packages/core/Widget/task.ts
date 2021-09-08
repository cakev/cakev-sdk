import WidgetConfig from '@dorring/sdk/core/Widget/conf'
import WidgetAnimation from '@dorring/sdk/core/Widget/animation'
import WidgetApi from '@dorring/sdk/core/Widget/api'
import WidgetBorder from '@dorring/sdk/core/Widget/border'
import WidgetFont from '@dorring/sdk/core/Widget/font'
import WidgetBackground from '@dorring/sdk/core/Widget/background'

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
		background?: WidgetBackground | null
		border?: WidgetBorder | null
		font?: WidgetFont | null
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
