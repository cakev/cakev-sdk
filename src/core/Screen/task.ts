import WidgetTask from '@/core/Widget/task'
import SceneTask from '@/core/Scene/task'

export default class ScreenTask {
	version = '1.1.0' // 大屏版本号
	id: string // 大屏ID
	name = '未命名' // 大屏名
	scenes: { [key: string]: SceneTask } = {} // 场景
	widgets: { [key: string]: WidgetTask } = {} // 大屏组件配置
	widgetsLays = {} // 大屏组件嵌套规则，显示规则
	type = 'CUSTOM' // 大屏类型 CUSTOM:大屏 TEMPLATE:模版
	avatar = '' // 大屏缩略图
	layoutMode = 'full-size' // 大屏适配方式 full-size 充满页面 full-width 100%宽度 full-height 100%高度
	remark = '' // 备注
	createTime: string // 创建时间
	updateTime: string // 更新时间
	width = 1920 // 大屏宽度
	height = 1080 // 大屏高度
	backgroundColor = '#fff' // 大屏背景颜色
	backgroundImage = '' // 大屏背景图片
	mainScene: string | number // 大屏首屏场景
	platform: string // 大屏平台类型 PC:PC
	domain: string // 大屏组件接口Domain
	headers: string // 大屏组件接口Headers
	filter = {
		enable: false, // 滤镜开启状态
		grayscale: 0, // 灰度
		opacity: 100, // 不透明度
		contrast: 0, // 对比度
		brightness: 0, // 明度
		saturate: 0, // 饱和度
		hueRotate: 0, // 色相
	}
	marketComponents = [] // 大屏内组件市场的组件
	constructor(id) {
		this.id = id
		this.scenes = { '0': new SceneTask('0') }
	}
}