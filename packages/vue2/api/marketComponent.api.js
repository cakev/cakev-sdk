import request, { headers } from './request'

export function getVersionList(data) {
	return request({
		url: '/market/component/version',
		method: 'post',
		data,
		headers,
	})
}

export function use(data) {
	return request({
		url: '/market/component/use',
		method: 'post',
		data,
		headers,
	})
}


export function useList(data) {
	return request({
		url: '/market/component/useList',
		method: 'post',
		data,
		headers,
	})
}
