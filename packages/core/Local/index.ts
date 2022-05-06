import Factory from '@/core/Base/factory'
import WidgetConf from '../Widget/conf'

interface widgetType {
	widgetTypeName: string
	widgetTypeId: string
	children: widgetType[]
}

export default class Local extends Factory<Local> {
	widgets: { [key: string]: WidgetConf[] } = {}
	widgetType: widgetType[] = []

	setWidgetTypes(value): void {
		this.widgetType = [...this.widgetType, ...value]
	}

	setWidgets(value) {
		value.forEach(item => {
			if (this.widgets[item.widgetTypeId]) {
				this.widgets[item.widgetTypeId].push(item)
			} else {
				this.widgets[item.widgetTypeId] = [item]
			}
		})
	}
}
