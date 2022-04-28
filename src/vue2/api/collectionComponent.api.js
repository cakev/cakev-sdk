import request, { headers } from './request'

export const list =(data)=> {
	return request({
		url: '/collection/component/list',
		method: 'post',
		data,
		headers,
	})
}

export const create=(data)=> {
	return request({
		url: '/collection/component/create',
		method: 'post',
		data,
		headers,
	})
}
