/**
 * 请求任务类
 */
import HttpBase from './taskBase'
import { Method } from 'axios'
export default class Task extends HttpBase {
	static STATUS_WAITTING = 0 // 请求被创建未推送到任务列表
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

	loopTime = 0 //定时刷新 单位 ms
	lastTime = 0 //上一次请求返回时间

	public thenCb: Function
	public catchCB: Function
	constructor(method: Method, url: string, params: any, loopTime) {
		super(method, url, params)
		this.loopTime = loopTime
		this.status = Task.STATUS_WAITTING
		this.errorCount = 0
	}

	execut(obj = {}): Promise<any> {
		return this.request(obj)
	}

	then(cb: Function): Task {
		this.thenCb = cb
		return this
	}

	catch(cb: Function): Task {
		this.catchCB = cb
		return this
	}
}
