import WidgetTask from '@/core/Widget/task'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default e => {
	const drap = e.dataTransfer.getData('widget-drag')
	if (!drap) return
	const widget = JSON.parse(drap)
	const data = new WidgetTask({
		x: Math.round((e.layerX - manager.temporary.offsetX) / manager.temporary.zoom - widget.width / 2),
		y: Math.round((e.layerY - manager.temporary.offsetY) / manager.temporary.zoom - widget.height / 2),
		...widget,
	})
	manager.screen.pushWidget(data)
}
