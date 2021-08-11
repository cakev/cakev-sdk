import axios, { AxiosRequestConfig, Method } from 'axios'

export default class HttpTaskBase {
	method: Method = 'get'
	url = ''
	headers = {}
	params: any = ''

	constructor(obj: { method?: Method; url: string; params?: any; loopTime?: number; headers?: any; }) {
		this.method = obj.method || 'GET'
		this.url = obj.url
		this.params = obj.params
		this.headers = obj.headers || {}
	}

	public request(): Promise<any> {
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
