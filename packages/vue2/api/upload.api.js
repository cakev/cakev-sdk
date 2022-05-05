import request from './request'

export function file(data) {
	return request({
		url: '/upload/file',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}
