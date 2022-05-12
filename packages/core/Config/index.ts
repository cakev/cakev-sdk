import Factory from '../Base/factory'

export default class Config extends Factory<Config> {
	head = []
	api = {
		widgetVersionList: '',
		widgetLoad: '',
		fileUpload: '',
	}

	animations = [
		{ label: '渐隐渐显', value: 'fadeIn' },
		{ label: '从左至右滑动', value: 'fadeInLeft' },
		{ label: '从右至左滑动', value: 'fadeInRight' },
		{ label: '从上至下滑动', value: 'fadeInDown' },
		{ label: '从下至上滑动', value: 'fadeInUp' },
		{ label: '从左上至右下滑动', value: 'fadeInTopLeft' },
		{ label: '从右上至左下滑动', value: 'fadeInTopRight' },
		{ label: '从左下至右上滑动', value: 'fadeInBottomLeft' },
		{ label: '从右下至左上滑动', value: 'fadeInBottomRight' },
	]

	setConfig(option = { api: {}, head: [] }) {
		if (option.api) this.api = { ...this.api, ...option.api }
		if (option.head) this.head = { ...this.head, ...option.head }
	}
}
