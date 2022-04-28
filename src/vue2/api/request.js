import { Message } from 'view-design'
import axios from 'axios'

const request = axios.create()
export const requestNoBaseURL = axios.create()
export const baseURL = '/node'
export const headers = {
	'Content-Type': 'application/json',
}
request.defaults.baseURL = baseURL
request.defaults.timeout = 30000
requestNoBaseURL.defaults.timeout = 30000
request.interceptors.request.use(
	function (config) {
		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

requestNoBaseURL.interceptors.request.use(
	function (config) {
		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

/**
 * @description
 * {
 *   result: '数据',
 *   code: 200,
 *   success: true
 *   message：'错误信息'
 * }
 */
const errMessage = '网络异常，请重试'
request.interceptors.response.use(
	response => {
		const { data } = response
		if (data) {
			if (data.success) {
				return data.result
			}
			if (data.code === 4001) {
				window.top.location.href = `${location.origin}/login`
				Message.error(data.message || errMessage)
				// eslint-disable-next-line prefer-promise-reject-errors
				return Promise.reject(false)
			}
			Message.error(data.message || errMessage)
			// eslint-disable-next-line prefer-promise-reject-errors
			return Promise.reject(false)
		} else {
			Message.error(errMessage)
			// eslint-disable-next-line prefer-promise-reject-errors
			return Promise.reject(false)
		}
	},
	function (e) {
		Message.error(errMessage)
		// eslint-disable-next-line prefer-promise-reject-errors
		return Promise.reject(false)
	},
)

requestNoBaseURL.interceptors.response.use(
	response => {
		const { data } = response
		if (data) {
			if (data.success) {
				return data.result
			}
			if (data.code === 4001) {
				window.top.location.href = `${location.origin}/login`
				Message.error(data.message || errMessage)
				// eslint-disable-next-line prefer-promise-reject-errors
				return Promise.reject(false)
			}
			Message.error(data.message || errMessage)
			// eslint-disable-next-line prefer-promise-reject-errors
			return Promise.reject(false)
		} else {
			Message.error(errMessage)
			// eslint-disable-next-line prefer-promise-reject-errors
			return Promise.reject(false)
		}
	},
	function (e) {
		Message.error(errMessage)
		// eslint-disable-next-line prefer-promise-reject-errors
		return Promise.reject(false)
	},
)

export default request
