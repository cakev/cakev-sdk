import { reactive } from 'vue'
import WidgetTask from '@dorring/sdk/core/Widget/task'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default e => {
	const drap = e.dataTransfer.getData('widget-drag')
	if (!drap) return
	const widget = JSON.parse(drap)
	const data = new WidgetTask({
		x: Math.round((e.layerX - state.manager.temporary.offsetX) / state.manager.temporary.zoom - widget.width / 2),
		y: Math.round((e.layerY - state.manager.temporary.offsetY) / state.manager.temporary.zoom - widget.height / 2),
		...widget,
	})
	state.manager.screen.pushWidget(data)
}
