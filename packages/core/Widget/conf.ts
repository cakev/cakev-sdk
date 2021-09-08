import WidgetAnimation from '@dorring/sdk/core/Widget/animation'
import WidgetApi from '@dorring/sdk/core/Widget/api'
import WidgetBorder from '@dorring/sdk/core/Widget/border'
import WidgetFont from '@dorring/sdk/core/Widget/font'
import WidgetBackground from '@dorring/sdk/core/Widget/background'

export default class WidgetConfig {
	name = '未知组件'
	version = '1.0.0'
	type: string
	data: Array<any> = []
	avatar = ''

	// 尺寸
	width = 100
	height = 100

	// 填充
	background: WidgetBackground | null = null

	// 文本
	font: WidgetFont | null = null

	// 描边
	border: WidgetBorder | null = null

	// 交互
	// 动画
	animation: WidgetAnimation = new WidgetAnimation()

	// 数据
	api: WidgetApi | null = null

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
	}) {
		this.name = obj.name
		this.width = obj.width
		this.height = obj.height
		if (obj.data) this.data = obj.data
		if (obj.type) this.type = obj.type
		if (obj.version) this.version = obj.version
		if (obj.avatar) this.avatar = obj.avatar
		if (obj.background) this.background = obj.background
		if (obj.border) this.border = obj.border
		if (obj.font) this.font = obj.font
		if (obj.animation) this.animation = obj.animation
		if (obj.api) this.api = obj.api
	}
}
