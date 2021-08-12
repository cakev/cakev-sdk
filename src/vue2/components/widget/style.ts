import WidgetTask from '@/core/Widget/task'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()
export default (widget: WidgetTask) => {
	return {
		top: widget.y + 'px',
		left: widget.x + 'px',
		width: widget.width + 'px',
		height: widget.height + 'px',
		backgroundColor: widget.backgroundColor,
		zIndex: manager.screen.currentScreen.widgetsLays[widget.id].zIndex,
	}
}
