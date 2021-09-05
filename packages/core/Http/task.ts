import WidgetApi from '@dorring/sdk/core/Widget/api'
import { Method } from 'axios'

export default class HttpTask extends WidgetApi {
	static STATUS_WAITING = 0 // 请求被创建未推送到任务列表
	static STATUS_READY = 1 // 推送到任务列表
	static STATUS_LOADING = 2 // 移出任务列表，开始请求
	static STATUS_RETRY = 3 // 错误重连
	static STATUS_FINISH = 4 // 请求已返回结果

	needCache = false // 接口本地缓存
	cacheTime = 0 // 天 月 年

	maxErrorCount = 3 // 错误重连次数
	errorCount = 0 //请求次数

	weight = 0 // 请求权重

	status: number
	lastTime = 0 //上一次请求返回时间

	public thenCb: Function
	public catchCB: Function
	constructor(obj?: {
		method?: Method
		url: string
		params?: any
		loop?: boolean
		loopTime?: number
		headers?: any
	}) {
		super(obj)
		this.status = HttpTask.STATUS_WAITING
		this.errorCount = 0
	}

	execut(): Promise<any> {
		return this.request()
	}

	then(cb: Function): HttpTask {
		this.thenCb = cb
		return this
	}

	catch(cb: Function): HttpTask {
		this.catchCB = cb
		return this
	}
}
