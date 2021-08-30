import { Method } from 'axios'

export default class WidgetApi {
	url: string
	method: Method = 'GET'
	loopTime = 10000 // 更新间隔时长
	loop = false // 是否自动更新
	params: any = '' // 参数

	constructor(obj?: { url?: string }) {
		if (obj) {
			if (obj.url) this.url = obj.url
		}
	}
}
