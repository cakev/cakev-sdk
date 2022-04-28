import Editor from '@/core/Editor'
import { usePath, useProcess } from '@/vue2/utils'
import LogTask from '@/core/Log/task'

const parseParams = (params = {}) => {
	if (typeof params === 'string' && params !== '') {
		try {
			return JSON.parse(params)
		} catch (e) {}
	}
	return params
}

const filterFalsyKey = input => {
	if (!input) return
	const isArray = Array.isArray(input)
	const output = !isArray ? {} : []
	Object.keys(input)
		.filter(key => {
			const value = input[key]
			return value !== undefined && value !== null && value !== ''
		})
		.forEach(key => {
			// @ts-ignore
			!isArray ? (output[key] = input[key]) : output.push(input[key])
		})
	return output
}

export default {
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	methods: {
		updateApiData(value) {
			if (!this.config || !this.config.api) return
			const api = this.config.api
			if (typeof value === 'object') {
				api.data = JSON.stringify(value)
				return
			}
			api.data = value
		},
		updateInnerData(value) {
			if (value !== '') {
				try {
					this.data = JSON.parse(value)
				} catch (e) {
					this.data = value
				}
			}
		},
		parseQueryResult(response, { path, process }) {
			if (!response.data || typeof response.data !== 'object') {
				return
			}
			response = usePath(path, response, errorMessage => {
				this.editor.log.push(new LogTask({ code: 'DATA_FILTER_ERROR', id: this.__widgetId__, errorMessage }))
			})
			response = useProcess(process, response, () => {
				this.editor.log.push(new LogTask({ code: 'DATA_FILTER_ERROR', id: this.__widgetId__ }))
			})
			this.data = response
		},
		outerQuery(api): void {
			const { url, method } = api
			if (!url) return
			// 解析 params
			const params = parseParams(api.params)
			this.editor.request(method, url, params, this.__widgetId__)
		},
		innerQuery(api): void {
			const { interface: innerUrl, params: conditions, method = 'POST' } = api.system
			if (!innerUrl) return
			// 解析 params
			let params = { ...parseParams(api.params) }
			if (typeof params === 'object') {
				Object.keys(params).forEach(key => {
					const value = params[key]
					params[key] = typeof value !== 'object' ? value : JSON.stringify(value)
				})
				Object.assign(params, filterFalsyKey(conditions))
			} else {
				params = filterFalsyKey(conditions)
			}
			if (!Object.keys(params).length) return
			params.queryId = params.dataAnalyseId
			params.params = JSON.stringify(params)
			this.editor.request(method, '/server/' + innerUrl, params, this.__widgetId__)
		},
		dispatchQuery(api): void {
			if (!api.system || !api.system.enable) {
				this.outerQuery(api) // 调用外部接口
				return
			}
			this.innerQuery(api) // 调用数仓接口
		},
		handleApiChange(): void {
			const api = this.config.api
			if (!api) return
			this.dispatchQuery(api)
		},
	},
	computed: {
		apiChangeWatcher() {
			const { url, params, method, path, process = {}, system = {} } = this.config.api || {}
			const { enable: processEnable, methodBody } = process
			const {
				enable: systemEnable,
				interface: innerUrl,
				path: innerPath,
				params: systemParams,
				method: innerMethod,
			} = system
			return {
				url,
				params,
				method,
				path,
				processEnable,
				methodBody,
				systemEnable,
				innerUrl,
				systemParams,
				innerPath,
				innerMethod,
			}
		},
	},
	watch: {
		'config.api.data': {
			handler(newVal) {
				if (newVal === undefined) return
				this.updateInnerData(newVal)
			},
			immediate: true,
			deep: true,
		},
		data(value) {
			this.updateApiData(value)
		},
		apiChangeWatcher: {
			handler: 'handleApiChange',
			immediate: true,
			deep: true,
		},
	},
}
