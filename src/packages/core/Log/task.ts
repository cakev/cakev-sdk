export default class LogTask {
	httpResponseURL: string
	httpStatus: number
	httpResponseText: string

	errorMessage: string
	code: 'HTTP_ERROR' | 'OTHERS'
	date: Date

	constructor(res) {
		this.code = res.code
		this.date = new Date()
		if (res.reason) {
			const request: XMLHttpRequest = res.reason.request
			if (request) {
				this.httpResponseURL = request.responseURL
				this.httpStatus = request.status
				this.errorMessage = res.reason.message
				this.httpResponseText = request.responseText
			}
		}
		if (res.errorMessage) {
			this.errorMessage = res.errorMessage
		}

		switch (this.code) {
			case 'HTTP_ERROR':
				console.warn(
					`\n错误时间    : ${this.date}\n错误代码    : ${this.code}\n错误内容    : ${this.httpResponseURL}\nhttp状态码  : ${this.httpStatus}\n${this.errorMessage}`,
				)
				break
			case 'OTHERS':
				console.warn(`\n错误代码    : ${this.code}\n错误内容    : ${this.errorMessage}`)
				break
		}
	}
}
