export default class StatisticsTask {
	userId: string
	randomSchema: string
	timeSchema: string

	get cookieEnabled() {
		return navigator.cookieEnabled
	}

	get platformType() {
		if (
			navigator.userAgent.match(
				/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
			)
		)
			return 'mobile'
		return 'pc'
	}

	get platformSchema() {
		function c(w, v) {
			let r,
				y = 0
			for (r = 0; r < v.length; r++) y |= k[r] << (8 * r)
			return w ^ y
		}
		let d = navigator.userAgent,
			f,
			k = [],
			n = 0
		for (f = 0; f < d.length; f++) {
			let u = d.charCodeAt(f)
			k.unshift(u & 255)
			4 <= k.length && ((n = c(n, k)), (k = []))
		}
		0 < k.length && (n = c(n, k))
		return n.toString(16)
	}
	setCookie(name, value) {
		const days = 30
		const exp = new Date()
		exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
		document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString()
	}
	getCookie(name) {
		let arr,
			reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
		if ((arr = document.cookie.match(reg))) return unescape(arr[2])
		else return null
	}
	delCookie(name) {
		const exp = new Date()
		exp.setTime(exp.getTime() - 1)
		const val = this.getCookie(name)
		if (val != null) document.cookie = name + '=' + val + ';expires=' + exp.toUTCString()
	}
	get screenSchema() {
		return (screen.height * screen.width).toString(16)
	}

	uuid() {
		this.timeSchema = (+new Date()).toString(16)
		this.randomSchema = Math.random().toString(16).replace('.', '')
		return (
			this.timeSchema +
			'-' +
			this.randomSchema +
			'-' +
			this.platformSchema +
			'-' +
			this.screenSchema +
			'-' +
			this.timeSchema
		)
	}

	init(cookieId) {
		this.userId = this.uuid()
		this.setCookie(cookieId, this.userId)
	}

	constructor(cookieId) {
		if (this.cookieEnabled) {
			const cookie = this.getCookie(cookieId)
			if (cookie) {
				const item = cookie.split('-')
				if (item[2] !== this.platformSchema || item[3] !== this.screenSchema) {
					this.init(cookieId)
				} else {
					this.timeSchema = item[0]
					this.randomSchema = item[1]
					this.userId = cookie
				}
			} else {
				this.init(cookieId)
			}
		}
	}
}
