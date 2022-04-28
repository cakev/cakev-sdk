import Factory from '@/core/Base/factory'

export default class Local extends Factory<Local> {
	widgets = {}
	components = {}

	setLocalComponents(value): void {
		this.components = { ...this.components, ...value }
	}
	setLocalWidgets(value: any): void {
		this.widgets = { ...value, ...this.widgets }
	}

	init(obj: any): void {
		const components = {}
		const snapshots = {}
		const widgetsObject = []
		const w = {}
		const conf = obj.conf
		const component = obj.component
		const snapshot = obj.avatar
		snapshot.keys().forEach(name => {
			const title = name.split('/')[2]
			snapshots[title] = snapshot(name)
		})
		component.keys().forEach(name => {
			const title = name.split('/')[2]
			components[title] = component(name).default
		})
		conf.keys().forEach(name => {
			const typeOne = name.split('/')[1]
			const typeTwo = name.split('/')[2]
			const componentConfig = {
				...conf(name).value,
				componentEnTitle: typeTwo,
			}
			const componentAvatar = snapshots[typeTwo]
			if (componentConfig) {
				if (w[typeOne]) {
					widgetsObject[widgetsObject.length - 1].children.push({
						componentId: Date.now(),
						componentConfig,
						componentTitle: typeTwo,
						componentEnTitle: typeTwo,
						componentAvatar,
						market: false,
					})
				} else {
					w[typeOne] = true
					widgetsObject.push({
						componentTypeName: typeOne,
						componentTypeEnName: typeOne,
						componentTypeId: typeOne,
						market: false,
						children: [
							{
								componentId: Date.now(),
								componentConfig,
								market: false,
								componentTitle: typeTwo,
								componentEnTitle: typeTwo,
								componentTypeId: typeTwo,
								componentAvatar,
							},
						],
					})
				}
			}
		})
		const result = {
			[obj.name]: {
				componentTypeName: obj.name,
				componentTypeEnName: obj.name,
				componentTypeId: obj.name,
				market: false,
				children: widgetsObject,
			},
		}
		this.setLocalComponents(components)
		this.setLocalWidgets(result)
	}
}
