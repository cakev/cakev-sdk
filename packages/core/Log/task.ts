import Widget from '@/core/Widget/normal'

export default class Log {
	httpResponseURL: string
	httpStatus: number
	httpResponseText: string

	errorMessage: string
	widget: Widget
	code: 'HTTP_ERROR' | 'OLD_METHOD_WARN' | 'LOAD_COMPONENT_ERROR' | 'DATA_FILTER_ERROR' | 'OTHERS'

	constructor(res) {
		this.code = res.code
		if (res.widget) this.widget = res.widget
		if (res.reason) {
			const request: XMLHttpRequest = res.reason.request
			this.httpResponseURL = request.responseURL
			this.httpStatus = request.status
			this.errorMessage = res.reason.message
			this.httpResponseText = request.responseText
		}
		if (res.errorMessage) {
			this.errorMessage = res.errorMessage
		}

		switch (this.code) {
			case 'HTTP_ERROR':
				console.warn(
					`\n错误代码    : ${this.code}\n错误组件id  : ${this.widget.id}\n错误内容    : ${this.httpResponseURL}\nhttp状态码  : ${this.httpStatus}\n${this.errorMessage}`,
				)
				break
			case 'OLD_METHOD_WARN':
				console.warn(`\n错误代码    : ${this.code}\n错误组件id  : 未知\n错误内容    : ${this.errorMessage}`)
				break
			case 'LOAD_COMPONENT_ERROR':
				console.warn(`\n错误代码    : ${this.code}\n错误组件id  : 未知\n错误内容    : 组件初始化加载失败`)
				break
			case 'DATA_FILTER_ERROR':
				console.warn(
					`\n错误代码    : ${this.code}\n错误组件id  : ${this.widget.id}\n错误内容    : 数据加工函数语法错误`,
				)
				break
			case 'OTHERS':
				console.warn(`\n错误代码    : ${this.code}\n错误组件id  : 未知\n错误内容    : ${this.errorMessage}`)
				break
		}
	}
}
