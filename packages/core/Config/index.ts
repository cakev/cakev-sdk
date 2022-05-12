import Factory from '../Base/factory'

export default class Config extends Factory<Config> {
	head = []
	api = {
		widgetVersionList: '',
		widgetLoad: '',
		fileUpload: '',
	}

	setConfig(option = { api: {}, head: [] }) {
		if (option.api) this.api = { ...this.api, ...option.api }
		if (option.head) this.head = { ...this.head, ...option.head }
	}
}
