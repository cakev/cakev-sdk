import WidgetAnimation from '@/core/Widget/animation'
import WidgetApi from '@/core/Widget/api'

export default class WidgetConfig {
	name = '未知组件'
	version = '1.0.0'
	type: string
	width = 100
	height = 100
	data: Array<any> = []
	avatar = ''
	backgroundColor: string | null = null
	animation: WidgetAnimation | null = null
	api: WidgetApi | null = null

	constructor(obj: {
		name: string
		width: number
		height: number
		data?: Array<any>
		version?: string
		type?: string
		avatar?: string
		backgroundColor?: string | null
		animation?: WidgetAnimation | null
		api?: WidgetApi | null
	}) {
		this.name = obj.name
		this.width = obj.width
		this.height = obj.height
		if (obj.data) this.data = obj.data
		if (obj.type) this.type = obj.type
		if (obj.version) this.version = obj.version
		if (obj.avatar) this.avatar = obj.avatar
		if (obj.backgroundColor) this.backgroundColor = obj.backgroundColor
		if (obj.animation) this.animation = obj.animation
		if (obj.api) this.api = obj.api
	}
}
