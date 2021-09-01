import Widget from '@/core/Widget/task'

class item extends Widget {
	readonly: boolean
	zIndex: number
}

export default (widget: item) => {
	return {
		top: (widget.readonly ? widget.y : 0) + 'px',
		left: (widget.readonly ? widget.x : 0) + 'px',
		width: widget.width + 'px',
		height: widget.height + 'px',
		backgroundColor: widget.backgroundColor,
		color: widget.color,
		fontSize: widget.fontSize + 'px',
		lineHeight: widget.lineHeight + 'px',
		textAlign: widget.textAlign,
		zIndex: widget.zIndex,
	}
}
