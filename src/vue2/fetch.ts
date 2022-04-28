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
			const params = parseParams(api.params)
			this.editor.request(method, url, params, this.__widgetId__)
		},
		dispatchQuery(api): void {
			this.outerQuery(api)
		},
		handleApiChange(): void {
			const api = this.config.api
			if (!api) return
			this.dispatchQuery(api)
		},
	},
	computed: {
		apiChangeWatcher() {
			const { url, params, method, path, process = {} } = this.config.api || {}
			const { enable: processEnable, methodBody } = process
			return {
				url,
				params,
				method,
				path,
				processEnable,
				methodBody,
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
