import WidgetTask from '@/core/Widget/task'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e: DragEvent) => {
	const widget = new WidgetTask({
		endX: e.offsetX,
		endY: e.offsetY,
		...JSON.parse(e.dataTransfer.getData('widget-drag')),
	})
	manager.screen.pushWidget(widget)
}
