import { Method } from 'axios'

export default class WidgetConfig {
	name = '未知组件'
	version = '1.0.0'
	type: string
	width = 100
	height = 100
	data: Array<any>
	avatar = ''
	backgroundColor: string | null = null
	apiUrl: string
	apiMethod: Method

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
	}) {
		this.width = obj.width
		this.height = obj.height
		this.data = obj.data
		this.name = obj.name
		this.version = obj.version
		this.type = obj.type
		if (obj.avatar) this.avatar = obj.avatar
		if (obj.apiUrl) this.apiUrl = obj.apiUrl
		if (obj.apiMethod) this.apiMethod = obj.apiMethod
	}
}
