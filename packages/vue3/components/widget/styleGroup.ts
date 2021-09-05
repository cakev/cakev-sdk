import Widget from '@dorring/sdk/core/Widget/task'

export default (widget: Widget) => {
	return {
		top: -widget.y + 'px',
		left: -widget.x + 'px',
	}
}
