import axios, { AxiosRequestConfig, Method } from 'axios'
export default class HttpBase {
	method: Method = 'get'
	url = ''
	headers = {}
	params: any = ''

	constructor(method: Method, url: string, params: any, headers?: any) {
		this.method = method
		this.url = url
		this.params = params
		this.headers = headers
	}

	public request(config: any): Promise<any> {
		const request = axios.create()
		return new Promise<any>((resolve, reject) => {
			let url = this.url
			let headers = this.headers
			if (config.screenHeaders) {
				try {
					headers = { ...JSON.parse(config.screenHeaders), ...headers }
				} catch (e) {
					console.warn('全局请求头格式不正确')
				}
			}
			if (config.screenDomain) {
				url = config.screenDomain + this.url
			}
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
