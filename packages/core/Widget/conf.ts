import WidgetAnimation from '@dorring/sdk/core/Widget/animation'
import WidgetApi from '@dorring/sdk/core/Widget/api'

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
	backgroundColor: string[] = ['rgba(255,255,255,0)']
	gradientDirection = 90

	// 字体
	color: string = 'rgba(51,51,51,1)'
	textAlign: 'left' | 'right' | 'center' = 'left'
	fontSize = 16
	lineHeight = 32

	// 描边
	borderColor: string = 'rgba(0,0,0,1)'
	borderWidth = 0
	borderStyle: 'solid' | 'dashed' = 'solid'

	// 交互
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
		backgroundColor?: string[]
		gradientDirection?: number
		color?: string | null
		fontSize?: number
		lineHeight?: number
		textAlign?: 'left' | 'right' | 'center'
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
		if (obj.gradientDirection) this.gradientDirection = obj.gradientDirection
		if (obj.color) this.color = obj.color
		if (obj.fontSize) this.fontSize = obj.fontSize
		if (obj.lineHeight) this.lineHeight = obj.lineHeight
		if (obj.textAlign) this.textAlign = obj.textAlign
		if (obj.animation) this.animation = obj.animation
		if (obj.api) this.api = obj.api
	}
}
