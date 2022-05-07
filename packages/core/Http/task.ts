import axios, { AxiosRequestConfig, Method } from 'axios'

type STATUS_WAIT = 'HTTP_WAIT'
type STATUS_RETRY = 'HTTP_RETRY'
type STATUS_READY = 'HTTP_READY'
type STATUS_LOADING = 'HTTP_LOADING'
type STATUS_FINISH = 'HTTP_FINISH'

export default class Task {
	static STATUS_WAIT: STATUS_WAIT = 'HTTP_WAIT' // 请求被创建未推送到任务列表
	static STATUS_READY: STATUS_READY = 'HTTP_READY' // 推送到任务列表
	static STATUS_LOADING: STATUS_LOADING = 'HTTP_LOADING' // 移出任务列表，开始请求
	static STATUS_RETRY: STATUS_RETRY = 'HTTP_RETRY' // 错误重连
	static STATUS_FINISH: STATUS_FINISH = 'HTTP_FINISH' // 请求已返回结果
	status: STATUS_WAIT | STATUS_READY | STATUS_LOADING | STATUS_RETRY | STATUS_FINISH

	needCache = false // 接口本地缓存
	cacheTime = 0 // 天 月 年
	maxErrorCount = 3 // 错误重连次数
	errorCount = 0 //请求次数
	weight = 0 // 请求权重
	loopTime = 0 //定时刷新 单位 ms
	lastTime = 0 //上一次请求返回时间

	domain = ''
	method: Method = 'get'
	url = ''
	headers: { [key: string]: string } = {}
	params: any = ''

	// @ts-ignore
	thenCallBack: Function
	// @ts-ignore
	catchCallBack: Function

	constructor({
		method,
		url,
		params,
		loopTime,
		domain,
		headers,
	}: {
		domain: string
		headers: { [key: string]: string }
		method: Method
		url: string
		params: any
		loopTime: number
	}) {
		this.method = method
		this.headers = headers
		this.domain = domain
		this.url = url
		this.params = params
		this.loopTime = loopTime
		this.status = Task.STATUS_WAIT
		this.errorCount = 0
	}

	then(cb: Function): Task {
		this.thenCallBack = cb
		return this
	}

	catch(cb: Function): Task {
		this.catchCallBack = cb
		return this
	}

	create(): Promise<any> {
		const request = axios.create()
		return new Promise<any>((resolve, reject) => {
			let url = this.url
			if (this.domain) {
				url = this.domain + this.url
			}
			const requestConfig: AxiosRequestConfig = {
				method: this.method,
				url,
				params: this.params,
				data: this.params,
				headers: this.headers,
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
