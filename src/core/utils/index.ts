import copy from 'fast-copy'

/**
 * @description uuid
 */
export function uuid(): string {
	return Math.random().toString(36).replace('0.', '')
}

/**
 * @description 合并对象 生成一个新的对象,用前面的覆盖后面的
 */
export const configMerge = function (from: any, to: any): any {
	const output = copy(to)
	const isArray = Array.isArray(from)
	;(!isArray ? Object.keys(from) : from).forEach((key, index) => {
		const actualKey = !isArray ? key : index
		const value = from[actualKey]
		if (value && typeof value === 'object') {
			if (!output[actualKey]) {
				output[actualKey] = !Array.isArray(value) ? { ...value } : [...value]
				return
			}
			output[actualKey] = configMerge(value, output[actualKey])
		} else if (value !== undefined) {
			output[actualKey] = value
		}
	})
	return output
}

/**
 * @description 1.0.0 --->100000
 * 每一位限两位数
 */
export function versionToNum(version: string): number {
	let num = version.split('.')
	num = num.map(item => {
		if (Number(item) >= 99) item = '99'
		if (Number(item) < 10) {
			item = '0' + item
		}
		return item
	})
	return Number(num.join(''))
}

/**
 * @description 获取url参数
 */
export function getQueryString(name) {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	const r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

/**
 * @description 加载三方包
 */
export function loadJs(src: string | string[], value: string): Promise<any> {
	if (!src) {
		return
	}
	if (!window.loadJS) {
		window.loadJS = {}
	}
	if (typeof src === 'string') {
		return new Promise<void>(resolve => {
			if (window.loadJS[value]) {
				resolve()
			} else {
				const el = document.createElement('script')
				el.src = src
				el.onload = () => {
					resolve()
					window.loadJS[value] = true
				}
				document.head.appendChild(el)
			}
		})
	} else {
		const p = []
		src.forEach((item, index) => {
			p.push(
				new Promise<void>(resolve => {
					if (window.loadJS[value[index]]) {
						resolve()
					} else {
						const el = document.createElement('script')
						el.src = item
						el.onload = () => {
							resolve()
							window.loadJS[value[index]] = true
						}
						document.head.appendChild(el)
					}
				}),
			)
		})
		return Promise.all(p)
	}
}

/**
 * @description 加载三方包css
 */
export function loadCss(src: string | string[], value: string): Promise<any> {
	if (!src) return
	if (!window.loadCSS) {
		window.loadCSS = {}
	}
	if (typeof src === 'string') {
		return new Promise<void>(resolve => {
			if (window.loadCSS[value]) {
				resolve()
			} else {
				const el = document.createElement('link')
				el.rel = 'stylesheet'
				el.href = src
				el.onload = () => {
					resolve()
					window.loadCSS[value] = true
				}
				document.head.appendChild(el)
			}
		})
	} else {
		const p = []
		src.forEach((item, index) => {
			p.push(
				new Promise<void>(resolve => {
					if (window.loadCSS[value[index]]) {
						resolve()
					} else {
						const el = document.createElement('link')
						el.rel = 'stylesheet'
						el.href = item
						el.onload = () => {
							resolve()
							window.loadCSS[value[index]] = true
						}
						document.head.appendChild(el)
					}
				}),
			)
		})
		return Promise.all(p)
	}
}
