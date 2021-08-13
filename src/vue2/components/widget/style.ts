import Manager from '@/core/Manager'
import Widget from '@/core/Widget/task'
const manager: Manager = Manager.Instance()

class item extends Widget {
	readonly: boolean
}

export default (widget: item) => {
	return {
		top: (widget.readonly ? widget.y : 0) + 'px',
		left: (widget.readonly ? widget.x : 0) + 'px',
		width: widget.width + 'px',
		height: widget.height + 'px',
		backgroundColor: widget.backgroundColor,
		zIndex: manager.screen.currentScreen.widgetsLays[widget.id].zIndex,
	}
}
