import Factory from '../Base/factory'
import WidgetTask from '../Widget/task'

interface widgetType {
	widgetTypeName: string
	widgetTypeId: string
	children?: widgetType[]
}

export default class Local extends Factory<Local> {
	widgets: { [key: string]: WidgetTask[] } = {}
	widgetType: widgetType[] = []

	setWidgetTypes(value: widgetType[]): void {
		this.widgetType = [...this.widgetType, ...value]
	}

	setWidgets(value: WidgetTask[]): void {
		value.forEach(item => {
			if (this.widgets[item.widgetTypeId]) {
				this.widgets[item.widgetTypeId].push(item)
			} else {
				this.widgets[item.widgetTypeId] = [item]
			}
		})
	}
}
