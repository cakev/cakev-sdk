export default (type = 'normal') => {
	return {
		widget: {
			name: '',
			id: Date.now(),
			version: '',
			locked: false,
		},
		layout: {
			width: 300,
			height: 200,
			left: 0,
			top: 0,
			scale: 1,
		},
		api: {
			url: '',
			method: 'GET',
			params: '',
			path: 'data',
			data: '',
			autoFetch: {
				enable: false,
				duration: 5000,
			},
			process: {
				enable: false,
				methodBody: '',
			},
		},
		widgetType: 'normal',
	}
}
