import axios, { AxiosRequestConfig, Method } from 'axios'

export default class WidgetApi {
	url: string
	method: Method = 'GET'
	loopTime = 10000 // 更新间隔时长
	loop = false // 是否自动更新
	params = {} // 参数
	headers: { [key: string]: string } = {} // 请求头
	path = '' // 数据路径

	constructor(obj?: {
		method?: Method
		url: string
		params?: any
		loop?: boolean
		loopTime?: number
		headers?: any
		path?: string
	}) {
		if (obj) {
			if (obj.url) this.url = obj.url
			if (obj.params) this.params = obj.params
			if (obj.loopTime) this.loopTime = obj.loopTime
			if (obj.loop) this.loop = obj.loop
			if (obj.headers) this.headers = obj.headers
			if (obj.method) this.method = obj.method
			if (obj.path) this.path = obj.path
		}
	}

	request(): Promise<any> {
		const request = axios.create()
		return new Promise<any>((resolve, reject) => {
			let url = this.url
			let headers = this.headers
			const requestConfig: AxiosRequestConfig = {
				method: this.method,
				url,
				params: this.params,
				data: this.params,
				headers,
			}
			request
				.request(requestConfig)
				.then((res: any) => {
					resolve(res.data)
				})
				.catch((error: any) => {
					reject(error)
				})
		})
	}
}
